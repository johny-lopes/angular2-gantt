import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';
import { GanttService } from './shared/services/gantt.service';
import { IGanttOptions, Project } from './shared/interfaces';

@Component({
    selector: 'gantt',
    template: `
        <div style="width: 100%">
            <div class="gantt_container" (window:resize)="onResize($event)">
                <gantt-header [name]="_project.name"></gantt-header>
                <gantt-activity [project]="_project" [options]="_options"></gantt-activity>
                <gantt-footer [project]="_project"></gantt-footer>
            </div>
        </div>
    `,
    styleUrls: [`
        .gantt_container {
            font-family: Arial;
            font-size: 13px;
            border: 1px solid #cecece;
            position: relative;
            white-space: nowrap;   
            margin-top: 0px;
        }
    `],
    providers: []
})
export class GanttComponent implements OnInit {
    private _project: Project;
    private _options: IGanttOptions;

    @Input()
    set project(project: any) {
        if (project) {
            this._project = project;
        } else {
            this.setDefaultProject();
        }
    }
    get project() { return this._project };

    @Input()
    set options(options: any) {
        if (options.scale) {
            this._options = options;
        } else {
            this.setDefaultOptions();
        }
    }
    get options() { return this._options };

    private ganttContainerWidth: number;

    constructor(private ganttService: GanttService) { }

    ngOnInit() { }

    setSizes(): void {
        this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
    }

    setDefaultOptions() {
        var scale = this.ganttService.calculateGridScale(this._project.tasks);

        this._options = {
            scale: scale
        }
    }

    setDefaultProject() {
        this._project = {
            id: '',
            name: '',
            tasks: []
        }
    }

    onResize($event: any): void {
        this.setSizes();
    }
}
