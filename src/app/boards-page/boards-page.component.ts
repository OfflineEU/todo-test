import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {BoardService} from '../services/board.service';
import {Board, Card, Column} from '../../environments/interfaces';
import * as $ from 'jquery';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss']
})
export class BoardsPageComponent implements OnInit, OnDestroy {
  formColumn: FormGroup;
  formCard: FormGroup;
  formEditColumn: FormGroup;
  formEditCard: FormGroup;
  board: Board;
  modalColumn: Column = {name: '', id: 0};
  modalCard: Card = {name: '', id: 0, content: ''};
  showDelete: boolean = false;
  sub$: Subscription;

  constructor(private route: ActivatedRoute,
              private boardService: BoardService) {
  }

  ngOnInit(): void {
    this.formColumn = new FormGroup({
      columnName: new FormControl('', Validators.required)
    });
    this.formCard = new FormGroup({
      cardName: new FormControl('', Validators.required),
    });
    this.formEditColumn = new FormGroup({
      editColumnName: new FormControl('', Validators.required),
    });
    this.formEditCard = new FormGroup({
      editCardName: new FormControl(this.modalCard.name, Validators.required),
      editCardContent: new FormControl(this.modalCard.content),
    });
    this.sub$ = this.route.params.subscribe((params: Params) => {
      this.board = this.boardService.boardById(+params.id);
    });
    $(document).on('click', function(event) {
      const modal = $('.settBlock');
      if (!$('.more').is(event.target) && !modal.is(event.target) && modal.has(event.target).length === 0) {
        modal.css('display', 'none');
      }
    });
  }

  submitColumn() {
    if (this.formColumn.invalid) {
      return;
    }
    const column: Column = {
      id: this.boardService.boardById(this.board.id).columns.length ? this.boardService.getLastColumnId(this.board.id) + 1 : this.boardService.getLastColumnId(this.board.id),
      name: this.formColumn.value.columnName,
      cards: []
    };
    this.boardService.boardById(this.board.id).columns.push(column);
    this.formColumn.reset();
    $('#create-column').css('display', 'none');
    $('.column-add').find('h3').css('display', 'block');
  }

  submitCard(id: number) {
    if (this.formCard.invalid) {
      return;
    }
    const card: Card = {
      id: this.boardService.columnById(this.board.id, id).cards.length ? this.boardService.getLastCardId(this.board.id, id) + 1 : this.boardService.getLastCardId(this.board.id, id),
      name: this.formCard.value.cardName,
      content: ''
    };
    this.boardService.columnById(this.board.id, id).cards.push(card);
    this.formCard.reset();
  }

  showColSett(event, id: number) {
    const modal = $('.settBlock');
    modal.css('display', 'none');
    const target = event.target;
    $(target).parent().find(modal).css('display', 'block');
    this.modalColumn = this.boardService.columnById(this.board.id, id);
    this.formEditColumn.controls['editColumnName'].setValue(this.modalColumn.name);
  }

  formEditColumnSubmit() {
    if (this.formEditColumn.invalid) {
      return;
    }
    const column = this.boardService.columnById(this.board.id, this.modalColumn.id);
    column.name = this.formEditColumn.value.editColumnName;
    $('.settBlock').css('display', 'none');
    this.formEditColumn.reset();
  }

  formEditCardSubmit() {
    if (this.formEditCard.invalid) {
      return;
    }
    const name = this.formEditCard.value.editCardName;
    const content = this.formEditCard.value.editCardContent;
    this.boardService.editCard(this.board.id, this.modalColumn.id, this.modalCard.id, name, content);
    $('.card-modal-wrapper').css('display', 'none');
    this.board = this.boardService.boards[this.board.id];
    this.modalColumn = this.boardService.columnById(this.board.id, this.modalColumn.id);
    this.modalCard = this.boardService.cardById(this.board.id, this.modalColumn.id, this.modalCard.id);
    this.formEditCard.reset();
  }

  deleteColumn(mode: boolean) {
    switch (mode) {
      case true:
        this.boardService.deleteColumn(this.board.id, this.modalColumn.id);
        break;
      case false:
        console.log('Column wasn\'t deleted');
        break;
      default:
        alert('Something went wrong');
    }
    $('.modal-wrapper').css('display', 'none');
    this.showDelete = false;
    this.board = this.boardService.boardById(this.board.id);
  }

  deleteCard(colId: number, cardId: number) {
    this.boardService.deleteCard(this.board.id, colId, cardId);
    this.board = this.boardService.boardById(this.board.id);
  }

  cardEdit(columnId: number, cardId: number) {
    this.modalColumn = this.boardService.columnById(this.board.id, columnId);
    this.modalCard = this.boardService.cardById(this.board.id, columnId, cardId);
    this.formEditCard.controls['editCardName'].setValue(this.modalCard.name);
    this.formEditCard.controls['editCardContent'].setValue(this.modalCard.content);
    $('.card-modal-wrapper').css('display', 'block');
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
