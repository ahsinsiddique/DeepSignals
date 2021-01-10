import { Component, OnInit } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { Assessment, AssessmentGraph } from 'src/app/model/model';
import { Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userAssessments = new Array<Assessment>();
  assessmentGraph = new AssessmentGraph();

  constructor(private assessmentService: AssessmentService) { }

  ngOnInit(): void {
    this.assessmentService.getUserAssessments().subscribe((resp: Assessment[]) => {
      this.userAssessments = resp
      console.log(resp);
      debugger
    })

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  onAssessmentSelected(id: number) {
    console.log(id);
    this.assessmentService.getUserAssessmentsGraph(id).subscribe(resp => {
      console.log(resp);
      debugger
    })
    this.assessmentGraph = {
      "data": {
        "Agreeableness": 13.333333333333334,
        "Drive": 21.666666666666668,
        "Luck": 10,
        "Openess": 30
      }, "type": "bar"
    }


  }


  // ----------------------------------------- Charts

  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Label[] = [['Agreeableness'], ['Drive'], 'Luck', 'Openess'];
  pieChartData: SingleDataSet = [this.assessmentGraph.data.Agreeableness, this.assessmentGraph.data.Drive,
    this.assessmentGraph.data.Luck, this.assessmentGraph.data.Openess];
  pieChartType: ChartType = 'bar';
  pieChartLegend = true;
  pieChartPlugins = [];


}
