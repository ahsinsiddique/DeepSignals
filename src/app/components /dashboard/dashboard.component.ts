import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { Assessment, AssessmentChartType, AssessmentGraph } from 'src/app/models/model';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userAssessments = new Array<Assessment>();
  assessmentGraph = new AssessmentGraph();


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Agreeableness', 'Drive', 'Luck', 'Openess'];
  public barChartType: ChartType = AssessmentChartType.BAR;
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  constructor(private assessmentService: AssessmentService) { }

  ngOnInit(): void {

    this.assessmentService.getUserAssessments().pipe(untilDestroyed(this)).subscribe((resp: Assessment[]) => {
      this.userAssessments = resp
    })

  }

  onAssessmentSelected(id: number) {
    this.assessmentService.getUserAssessmentsGraph(id).pipe(untilDestroyed(this)).subscribe((resp: AssessmentGraph) => {
      this.assessmentGraph = resp;
      this.setGraphData();

    }, error => {
      // TODO need to remove after api work
      this.setGraphData()

    })


  }

  setGraphData() {
    /**
     * TODO As API call was showing issues, So using static data for graph
     */
    const assessmentGraph = {
      "data": {
        "Agreeableness": 13.333333333333334,
        "Drive": 21.666666666666668,
        "Luck": 10,
        "Openess": 30
      }, "type": "bar" ? AssessmentChartType.BAR : AssessmentChartType.PIE // default type is PIE
    }

    this.assessmentGraph = this.assessmentGraph.data? this.assessmentGraph: assessmentGraph;      // TODO remove after api fixed


    this.barChartData = [
      {
        data: [this.assessmentGraph.data.Agreeableness, this.assessmentGraph.data.Drive, this.assessmentGraph.data.Luck,
          this.assessmentGraph.data.Openess], label: 'Series A'
      },
    ];
  }

  ngOnDestroy() {}
}
