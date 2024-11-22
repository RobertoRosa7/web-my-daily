import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { InDestroyDirective } from '../../../../../core/directives/destroy/destroy.directive';
import { NameIdComponent } from '../../../../auth/core/components/input-name-id/name-id.component';

@Component({
  selector: 'app-change-domain-name',
  templateUrl: './change-domain-name.component.html',
  styleUrl: './change-domain-name.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, NameIdComponent],
})
export class ChangeDomainNameComponent extends InDestroyDirective implements OnInit {
  ngOnInit(): void {}
}
