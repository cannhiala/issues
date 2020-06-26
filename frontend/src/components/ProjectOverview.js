import React, {useState, useEffect} from 'react'
import {  useParams } from "react-router-dom"
import axios from 'axios'
import CanvasJSReact from './../assets/canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart


function ProjectOverview () {

  const url = 'http://localhost:3001/'

  const { pId } = useParams()
  const [projectHealth, setProjectHealth] = useState({pName: '', pStatus: '', pType: '', pProgress: 0, pOwner: '', pStartdate: '', pEndate: ''})
  const [optionsPie, setOptionsPie] = useState({})
  const [stackedChartProjectType, setStackedChartProjectType] = useState()
  const [optionsStackedChart, setOptionsStackedChart] = useState({width: 500,
                                                                    height: 320,
                                                                    axisY:{
                                                                      labelFormatter: function(e){
                                                                        return  ""
                                                                      }
                                                                     },
                                                                    data: []})
 const [test, setTest] = useState([{
                                       type: "stackedBar100",
                                               color: "#FF0000",
                                               name: "Open",
                                               indexLabel: "{y}",
                                               indexLabelFontColor: "white",
                                               dataPoints: [
                                                 { label: "Design",   y: 15 },
                                                 { label: "Coding",   y: 0 },
                                                 { label: "Testing",   y: 77 },
                                                 { label: "Deploy",   y: 68 }
                                               ]
                                             }, {
                                               type: "stackedBar100",
                                               color: "orange",
                                               name: "In Progress",
                                               indexLabel: "{y}",
                                               indexLabelFontColor: "white",
                                               dataPoints: [
                                                 { label: "Design",   y: 15 },
                                                 { label: "Coding",   y: 0 },
                                                 { label: "Testing",   y: 23 },
                                                 { label: "Deploy",   y: 32 }
                                               ]
                                             }])
 const [dataCoding, setDataCoding] = useState({ label: "Coding",   y: 0 })

  const options = {
          width: 500,
          height: 320,
          axisY:{
            labelFormatter: function(e){
      				return  ""
      			}
           },
    			data: [{
    				type: "stackedBar100",
    				color: "#FF0000",
    				name: "Open",
    				indexLabel: "{y}",
    				indexLabelFontColor: "white",
    				dataPoints: [
    					{ label: "Design",   y: 15 },
    					{ label: "Coding",   y: 0 },
    					{ label: "Testing",   y: 77 },
    					{ label: "Deploy",   y: 68 }
    				]
    			}, {
    				type: "stackedBar100",
    				color: "orange",
    				name: "In Progress",
    				indexLabel: "{y}",
    				indexLabelFontColor: "white",
    				dataPoints: [
    					{ label: "Design",   y: 15 },
    					{ label: "Coding",   y: 0 },
    					{ label: "Testing",   y: 23 },
    					{ label: "Deploy",   y: 32 }
    				]
    			}, {
    				type: "stackedBar100",
    				color: "#00FF00",
    				name: "Resolved",
    				indexLabel: "{y}",
    				indexLabelFontColor: "white",
    				dataPoints: [
    					{ label: "Design",   y: 15 },
    					{ label: "Coding",   y: 0 },
    					{ label: "Testing",   y: 23 },
    					{ label: "Deploy",   y: 32 }
    				]
    			}, {
    				type: "stackedBar100",
    				color: "Blue",
    				name: "Closed",
    				indexLabel: "{y}",
    				indexLabelFontColor: "white",
    				dataPoints: [
    					{ label: "Design",   y: 15 },
    					{ label: "Coding",   y: 0 },
    					{ label: "Testing",   y: 23 },
    					{ label: "Deploy",   y: 32 }
    				]
    			}]
    		}

  useEffect(() => {
     axios.get(url + 'projectDetail?pId='+ pId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0)
                 setProjectHealth({pName: res.data[0].name,
                   pStatus: res.data[0].status,
                   pType: res.data[0].project_type_name,
                   pProgress: res.data[0].progress,
                   pOwner: res.data[0].owner_fullname,
                   pStartdate: res.data[0].start_date,
                   pEndate: res.data[0].end_date})
           } else {const error = new Error(res.error)
                   console.log(error) }
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [pId])

  useEffect(() => {
     axios.get(url + 'getPieChart?pId='+ pId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0) {
               setOptionsPie({exportEnabled: true,
                             animationEnabled: true,
                             title: {
                               text: "Issues Status"
                             },
                             data: [{
                               type: "pie",
                               showInLegend: true,
                               legendText: "{label}",
                               toolTipContent: "{label}: <strong>{y}</strong>",
                               indexLabel: "{y}",
                               indexLabelPlacement: "inside",
                               dataPoints: res.data
                             }]
               })
               // console.log("==========" + JSON.stringify(optionsPie))
               // res.data.forEach((iType, i) => {
               //   console.log("=== " + iType.name);
               // });
               //  setpieData2('${pieData}${newAppendedText}}')
               // console.log("==========" + JSON.stringify(res.data))
               //  setPieData('toi la Can')
               // console.log("==========" + pieData)
             }
           } else {const error = new Error(res.error)
                   console.log(error) }
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [pId])
  useEffect(() => {
     axios.get(url + 'getStackedChartProjectType?pId='+ pId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0) {

                // console.log("==================3 ", res)
                // console.log("==================3 ", res)
                // setStackedChartProjectType(res.data)
                // // console.log("==================3 ", optionsStackedChart.data)
                //

                // console.log("==============23423==== ", JSON.stringify(optionsStackedChart))
             }
           } else {const error = new Error(res.error)
                   console.log(error) }
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [pId])

  useEffect(() => {
     axios.get(url + 'getStackedChart?pId='+ pId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0) {
                let strData = res.data.map(dataObj => ({
                  type: "stackedBar100",
                  color: dataObj.color,
                  name: dataObj.label,
                  indexLabel: "{y}",
                  indexLabelFontColor: "white",
                  dataPoints: [
                    { label: dataObj.name, y: dataObj.y }
                  ]
                }))
                // console.log("================== ", strData)
                // console.log("==================test ", test)
                // console.log("==================test2 ", test[0])
                setOptionsStackedChart ({...optionsStackedChart, data: strData})
                // console.log("==================3 ", optionsStackedChart.data)
                //console.log("==================test3 ", ...optionsStackedChart.data[0])
                optionsStackedChart.data.map((obj) => (
                  console.log("=========obj ", obj)
                ))
                // setOptionsStackedChart ({...optionsStackedChart, data: [...optionsStackedChart.data[0], ...optionsStackedChart.data[0].dataPoints: dataCoding]})
                // setOptionsStackedChart ({...optionsStackedChart, data: [...optionsStackedChart.data[1], ...optionsStackedChart.data[1].dataPoints: dataCoding]})
                // setOptionsStackedChart ({...optionsStackedChart, data: [...optionsStackedChart.data[2], ...optionsStackedChart.data[2].dataPoints: dataCoding]})
                // setOptionsStackedChart ({...optionsStackedChart, data: [...optionsStackedChart.data[3], ...optionsStackedChart.data[3].dataPoints: dataCoding]})
                // console.log("==================test4 ", ...optionsStackedChart.data[0].dataPoints)
             }
           } else {const error = new Error(res.error)
                   console.log(error) }
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [pId])

  return (
    <div id="container" className="fixed-header sidebar-closed">
        <div id="content">
            <div className="container">
                <div className="crumbs">
                    <ul className="breadcrumb"><b>Project Overview</b></ul>
                </div>
                <br /><br />
                <fieldset className="form-group redo-fieldset ">
                  <legend className="reset-this redo-legend">Health</legend>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Project Name:</label>
                    <label className="col-sm-4 col-form-label">{projectHealth.pName}</label>
                    <label className="col-sm-2 col-form-label">Owner:</label>
                    <label className="col-sm-4 col-form-label">{projectHealth.pOwner}</label>
                  </div>

                  <div className="form-group row" >
                    <label className="col-sm-2 col-form-label">Project status:</label>
                    <label className="col-sm-4 col-form-label">{projectHealth.pStatus}</label>
                    <label className="col-sm-2 col-form-label">Start Date:</label>
                    <label className="col-sm-1 col-form-label">{projectHealth.pStartdate}</label>
                  </div>

                  <div className="form-group row" >
                    <label className="col-sm-2 col-form-label">Project Type:</label>
                    <label className="col-sm-4 col-form-label">{projectHealth.pType}</label>
                    <label className="col-sm-2 col-form-label">End Date:</label>
                    <label className="col-sm-4 col-form-label">{projectHealth.pEndate}</label>
                  </div>
                  <div className="form-group row" >
                    <label className="col-sm-2 col-form-label">Start Progress:</label>
                    <label className="col-sm-4 col-form-label">{projectHealth.pProgress} %</label>
                  </div>
                </fieldset>
                <fieldset className="form-group redo-fieldset ">
                  <legend className="reset-this redo-legend">Issues</legend>
                  <CanvasJSChart options = {optionsPie}
                				/* onRef={ref => this.chart = ref} */
                		/>
                  <CanvasJSChart options = {optionsStackedChart}
            				/* onRef={ref => this.chart = ref} */
            			/>
                </fieldset>
            </div>
        </div>
    </div>
  )
}

export default ProjectOverview
