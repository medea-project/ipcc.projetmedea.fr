within("projetmedea.fr", function() {
  var
    no = this.no,
    forEach = this.forEach,
    hideElement = this.hideElement,
    showElement = this.showElement;

  function preventFormSubmission(form) {
    form.onsubmit = function(){
      return false; // prevent submission to server (reloads the page)
    };
  }

  function getSelectedOption(select){
    var
      options = select.childNodes,
      selectedOption = null;
    forEach(options, function(option){
      if ( option.selected ){
        selectedOption = option;
        return true;
      }
    });
    return selectedOption;
  }

  function setOptionText( option, text ) {
    var textNode = option.firstChild;
    if ( no(textNode) ) {
      textNode = document.createTextNode(text);
      option.appendChild(textNode);
    } else {
      textNode.nodeValue = text;
    }
  }

  function hideOption( option ) {
    hideElement( option );
    // hiding options is not supported in all browsers (2014: IE, Safari)
    // make sure that the option cannot be selected.
    option.disabled = true;
  }

  function showOption( option ) {
    showElement( option );
    // hiding options is not supported in all browsers (2014: IE, Safari)
    option.disabled = false;
  }

  this.preventFormSubmission = preventFormSubmission;
  this.getSelectedOption = getSelectedOption;
  this.setOptionText = setOptionText;
  this.hideOption = hideOption;
  this.showOption = showOption;
});
