within("projetmedea.fr", function(publish, subscribe, get, set){

  var
    forEach = this.forEach,
    map = this.map,
    no = this.no,
    or = this.or,
    form = document.getElementById('data-filters'),
    fieldPositions = {},
    OPERATORS = {};

  OPERATORS.EQUALS = function(actualValue, expectedValue){
    return expectedValue === actualValue;
  };

  OPERATORS['LOWER-THAN-OR-EQUAL-TO'] = function(actualValue, expectedValue){
    return Number(actualValue) <= Number(expectedValue);
  };

  OPERATORS['GREATER-THAN-OR-EQUAL-TO'] = function(actualValue, expectedValue){
    return Number(actualValue) >= Number(expectedValue);
  };

  OPERATORS.CONTAINS = function(actualValues, expectedValue){
    var isFound = forEach(actualValues, function(actualValue){
      return actualValue === expectedValue;
    });
    return isFound;
  };

  function initFieldPositions(fieldNames){
    forEach(fieldNames, function(fieldName, fieldPosition){
      fieldPositions[fieldName] = fieldPosition;
    });
  }

  // Get the offset of a field
  function getFieldPosition(name){
    return fieldPositions[name];
  }

  function applyFilters(){
    var
      FILTER_PREFIX = 'filter-',
      filters = [],
      fieldNames = get('author-field-names');
    forEach(fieldNames, function(fieldName){
      var input = form[FILTER_PREFIX+fieldName];
      if ( !no(input) && !no(input.nodeType) && input.value !== '' ){
        filters.push({
          name: fieldName,
          value: input.value,
          operator: or( input.getAttribute('data-operator'), 'EQUALS')
        });
      }
    });
    publish("filters", filters);
  }

  function getOperators(filters){
    return map(filters, function(filter){
      return OPERATORS[ filter.operator ];
    });
  }

  function filter(data, filters){
    if ( filters.length === 0 ){
      return; // no filter applied
    }

    var
      selected = [],
      selectedFlags = Array(data.length),
      operators = getOperators(filters);

    forEach(data, function(record, position){
      var authorId = record[getFieldPosition('id')];
      if ( position === 0 ) {
        selected.push(record); // always keep header
        selectedFlags[0] = false;
        return;
      }
      var
        isSelected,
        isRejected = forEach(filters, function(filter, f){
        return !operators[f](
          record[getFieldPosition(filter.name)],
          filter.value
        );
      });
      isSelected = !isRejected;
      if ( isSelected ) {
        selected.push(record);
      }
      selectedFlags[authorId] = isSelected;
    });
    publish("selected-authors", selected);
    publish("selected-author-flags", selectedFlags);
  }

  form.onsubmit = function(){
    applyFilters();
    return false; // prevent submission to server (reloads the page)
  };

  subscribe("authors", function(data){
    publish('author-field-names', data[0]);
    // apply initial filters
    applyFilters();
  });

  subscribe("author-field-names", function(fieldNames){
    initFieldPositions(fieldNames);
  });

  subscribe("filters", function(filters){
    var data = get('authors');
    filter(data,filters);
  });

});