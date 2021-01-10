import { Component, OnInit } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { Assessment, AssessmentGraph, AssessmentChartType } from 'src/app/models/model';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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

  constructor(private assessmentService: AssessmentService,
              private usersService: UsersService) { }

  ngOnInit(): void {

    this.assessmentService.getUserAssessments().subscribe((resp: Assessment[]) => {
      this.userAssessments = resp
    })

  }

  onAssessmentSelected(id: number) {
    this.assessmentService.getUserAssessmentsGraph(id).subscribe(resp => {
      console.log(resp);

    })
    /**
     * TODO As API call was showing issues, So using static data for graph
     */
    this.assessmentGraph = {
      "data": {
        "Agreeableness": 13.333333333333334,
        "Drive": 21.666666666666668,
        "Luck": 10,
        "Openess": 30
      }, "type": "bar" ? AssessmentChartType.BAR : AssessmentChartType.PIE // default type is PIE
    }

    this.barChartData = [
      {
        data: [this.assessmentGraph.data.Agreeableness, this.assessmentGraph.data.Drive, this.assessmentGraph.data.Luck,
          this.assessmentGraph.data.Openess], label: 'Series A'
      },
    ];
  }



}
