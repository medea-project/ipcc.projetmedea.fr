within("projetmedea.fr", function(publish, subscribe, get){
  var
    or = this.or,

    // separator between years in subheading of the chart
    YEAR_SEPARATOR = " - ";

  function getWorkingGroupLayout(title, subtitle) {
    return [
      ["chart","width",title,subtitle],
      ["height",
        [
          ["table-layout","column1+2","column3"],
          ["row1+2+3",
            [
              ["table-layout",
                "column1",
                "column2"
              ],
              ["row1",
                {
                  name: 'WG1',
                  shape: 'circle',
                  valign: 'bottom',
                  align: 'right',
                  color: '#FF0000'
                },
                {
                  name: 'WG1+3',
                  shape: 'circle',
                  valign: 'bottom',
                  align: 'center',
                  color: '#FF00FF'
                }
              ],
              ["row2",
                {
                  name: 'WG1+2',
                  shape: 'circle',
                  valign: 'middle',
                  align: 'center',
                  color: '#CCCC00'
                },
                {
                  name: 'WG1+2+3',
                  shape: 'circle',
                  valign: 'middle',
                  align: 'center',
                  color: '#000000'
                }
              ],
              ["row3",
                {
                  name: 'WG2',
                  shape: 'circle',
                  valign: 'top',
                  align: 'right',
                  color: '#00FF00'
                },
                {
                  name: 'WG2+3',
                  shape: 'circle',
                  valign: 'top',
                  align: 'center',
                  color: '#00FFFF'
                }
              ]
            ],
            [
              ["table-layout", "column3"],
              ["row1+2+3",
                {
                  name: 'WG3',
                  shape: 'circle',
                  valign: 'middle',
                  align: 'left',
                  color: '#0000FF'
                }
              ]
            ]
          ]
        ]
      ]
    ];
  }

  publish("layout/cumulated-working-group-categories",function(){
    var
      years = or(get("assessment-reports/years"), []),
      allYears = years.join(YEAR_SEPARATOR);
    return getWorkingGroupLayout("All AR",allYears);
  });
});
