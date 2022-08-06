import { Component, OnInit } from '@angular/core';
import { Device, DevicesData } from '@core/data/devices';
import { NbDialogService } from '@nebular/theme';
import { DeviceAddComponent } from './device-add/device-add.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

@Component({
  selector: 'ngx-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  settings = {
    add: '<i class="plus-circle-outline"></i>',
    edit: {
      editButtonContent: '<i class="edit-outline\n"></i>',
      saveButtonContent: '<i class="heckmark-circle-2-outline"></i>',
      cancelButtonContent: '<i class="close-circle-outline"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="trash-outline"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Device Name',
        type: 'string',
      },
      firmware_version: {
        title: 'Fireware Version',
        type: 'string',
      },
    },
  };

  source: Device[];

  constructor(private service: DevicesData, private dialogService: NbDialogService ) {
    this.service.getDevices().subscribe(
      data => {
        this.source = data;
      }
    );
  }

  ngOnInit() {
  }

  openDeviceDetail(event) {
    this.dialogService.open(DeviceDetailComponent, {
      context: {
        title: event.data.name,
      },
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
