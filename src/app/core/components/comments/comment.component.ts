import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { HappenComment } from '../../interfaces/happens/happen.comment.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnChanges, OnInit {
  public readonly form: FormControl = new FormControl('');
  public expanded!: boolean;

  private readonly detectorChange = inject(ChangeDetectorRef);

  @Input()
  public comment!: HappenComment;

  @Input()
  public id: string | null | undefined;

  @Input({ required: true })
  public enableMenuButton!: boolean;

  @Output()
  public onComment = new EventEmitter<HappenComment>();

  @Output()
  public onDelete = new EventEmitter<HappenComment>();

  ngOnChanges(_: SimpleChanges): void {
    this.detectorChange.detectChanges();
    this.form.setValue(this.comment.text);
  }

  ngOnInit(): void {
    this.form.setValue(this.comment.text);
  }

  public onRemove(comment: HappenComment) {
    this.onDelete.emit(comment);
  }

  public updateComment(comment: HappenComment) {
    if (!this.form.value) {
      throw Error('Null nenhum valor foi passado');
    }

    this.onComment.emit({ ...comment, text: this.form.value.trim() });
    this.form.reset();
    this.expanded = false;
  }

  public get getInsigniaColor() {
    return this.comment.scoreNegative > this.comment.scorePositive ? 'blue' : 'red';
  }
}
