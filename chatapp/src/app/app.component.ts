import { Component } from "@angular/core";
import * as io from "socket.io-client";
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  pollObj: any;
  pollValue: string;
  socket: SocketIOClient.Socket;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    this.socket = io.connect('http://localhost:8080');
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  ngOnInit() {
    this.listen2Events();
  }
  listen2Events() {
    this.socket.on("poll", data =>  {
      this.pollObj = data;
      this.getChartData();
    });

    this.socket.on("newObj", data =>  {
      this.pollObj = data;
      this.resetChartData();
      this.getChartData();
    });
  }

  vote() {
    this.socket.emit("newVote", this.pollValue);
  }

  resetChartData() {
    this.pieChartLabels = [];
    this.pieChartData = [];
  }

  getChartData() {
    this.pollObj.options.forEach(option => {
      this.pieChartData.push(option.count);
      this.pieChartLabels.push(option.text);
    });
  }
}