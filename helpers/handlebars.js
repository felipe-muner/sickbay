function hbsHelpers(hbs) {
  return hbs.create({
    extname: '.hbs',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/',
    defaultLayout: 'layout',
    helpers: {
      section: function(name, options) {
        if(!this._sections) this._sections = {}
        this._sections[name] = options.fn(this)
        return null
      },
      toTitleCase: function(str) {
        str = str || ''
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
      },
      json: function(obj) {
        return JSON.stringify(obj, null, 2).replace(/"/g, "'")
      },
      i18n: function(label) {
        return __(label)
      },
      formatBoolean: function(value) {
        if(value) {
          return __('yes')
        } else {
          return __('no')
        }
      }
    }
  })
}

module.exports = hbsHelpers
