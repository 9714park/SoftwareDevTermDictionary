import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/shared/data-manager.service';
import { EnglishTermApi, DefinitionRequest } from 'src/app/shared/model/term.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-definition-edit',
  templateUrl: './definition-edit.component.html',
  styleUrls: ['./definition-edit.component.css']
})
export class DefinitionEditComponent implements OnInit {
  term: EnglishTermApi;
  newDefinition: DefinitionRequest;

  constructor(private dataManager: DataManagerService, private route: ActivatedRoute) {
    this.newDefinition = new DefinitionRequest();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.dataManager.getEnglishTermById(id).subscribe(termResult => {
      this.term = termResult;
    });
  }

  onLikeClick(index: number) {
    const selectedDefinition = this.term.definitions[index];

    this.dataManager
      .incrementLikes(selectedDefinition._id, { _id: selectedDefinition._id })
      .subscribe(termResult => (this.term = termResult));
  }

  onReset() {}

  onTermSave() {}
}
