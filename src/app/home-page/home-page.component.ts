import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Board} from '../../environments/interfaces';
import {Router} from '@angular/router';
import {BoardService} from '../services/board.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('addBoardWrapper') addBoardWrapper: ElementRef;
  @ViewChild('modalWrapper') modalWrapper: ElementRef;
  form: FormGroup;
  formEdit: FormGroup;
  modalData: Board = {name: '', id: 1};
  showDelete: boolean = false;
  addBoardModal: boolean = false;
  editBoardModal: boolean = false;
  showSettBtn: boolean = false;

  constructor(public boardService: BoardService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      boardName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });
    this.formEdit = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const board: Board = {
      id: this.boardService.getLastBoardId() + 1,
      name: this.form.value.boardName,
      columns: [],
    };
    this.boardService.createBoard(board);
    this.form.reset();
    this.router.navigate(['/']);
    this.addBoardWrapper.nativeElement.style.display = 'none';
    this.addBoardModal = false;
  }

  showModal(id: number) {
    this.modalData = this.boardService.boardById(id);
    this.editBoardModal = true;
    this.formEdit.controls['name'].setValue(this.modalData.name);
  }

  editSubmit() {
    if (this.formEdit.invalid) {
      return;
    }
    const board = this.boardService.boardById(this.modalData.id);
    board.name = this.formEdit.value.name;
    this.modalWrapper.nativeElement.style.display = 'none';
    this.formEdit.reset();
    this.editBoardModal = false;
  }

  deleteBoard(mode: boolean) {
    switch (mode) {
      case true:
        this.boardService.deleteBoard(this.modalData.id);
        console.log('Board was deleted');
        break;
      case false:
        console.log('Board wasn\'t deleted');
        break;
      default:
        console.log('Something went wrong');
    }
    this.modalWrapper.nativeElement.style.display = 'none';
    this.showDelete = false;
    this.editBoardModal = false;
  }
}
