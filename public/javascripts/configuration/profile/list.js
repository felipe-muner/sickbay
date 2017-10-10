let listValidations = {}

$(document).ready(function() {
  renderDataTable([2], 0)
  loadListValidations()
})

function editModal(profileID) {
  $.ajax({
    url: '/configuration/profile/' + profileID,
    type: 'GET',
    data: '',
    dataType:'json',
    success: function(data) {
      let functionalitiesID = data.profile.Functionalities
      let functionalities = data.functionalities

      $("#accessBotafogo")[0].checked = data.profile.AccessBotafogo
      $("#accessUrca")[0].checked = data.profile.AccessUrca
      $("#accessBarra")[0].checked = data.profile.AccessBarra

      if(functionalitiesID) {
        functionalitiesID.split(',').forEach(function(id) {
          functionalities.map(function(obj) {
            if(id == obj.FunctionalityID) {
              $("input[type='checkbox'][value='" + obj.FunctionalityID + "']")[0].checked = true
            }
          })
        })
      } else {
        functionalities.map(function(obj) {
          $("input[type='checkbox'][value='" + obj.FunctionalityID + "']")[0].checked = false
        })
      }

      $('#idProfile').val(profileID)
      $('#nameProfile').val(data.profile.nomeperfilacesso)
      $('#editModal').modal('show')
    }
  })
}

function checkFunctionality(fatherID) {
  $(`input[type=checkbox][value='${fatherID}']`)[0].checked = true
}

function checkFunctionalities(e) {
  let checkboxes = $(e).closest('.father').find('.son input')
  for(let i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = e.checked;
  }
}

$('#formEditProfile').submit(function(e) {
  if($('div.checkbox-group.required :checkbox:checked').length === 0) {
    e.preventDefault()
    swal(listValidations.notSeeUnit, '', 'error')
  }
})
