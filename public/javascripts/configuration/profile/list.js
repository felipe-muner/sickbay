$(document).ready(function() {
  renderDataTable([2], 0)
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

      if(data.profile.all_units) {
        $("input[name=allUnits]").val(['1'])
      } else {
        $("input[name=allUnits]").val(['0'])
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
