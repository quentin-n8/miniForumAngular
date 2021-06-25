import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sujet } from "../modeles/sujet";
import { User } from "../modeles/User";
import { SujetsService } from "../services/sujetsService"
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-accueil-new-subject',
  templateUrl: './accueil-new-subject.component.html',
  styleUrls: ['./accueil-new-subject.component.css']
})

export class AccueilNewSubjectComponent implements OnInit {
  topicSubscription!: Subscription;
  usersSubscription!: Subscription;
  listeSujetsObjets: Sujet[] = [];
  listeUsers: User[] = [];
  newSubjectForm!: FormGroup;
  


  constructor(private router: Router, private formBuilder: FormBuilder, private sujetService: SujetsService, private userservice: UsersService) { 
    
  }

  

  ngOnInit(): void {

    this.newSubjectForm = this.formBuilder.group({
      newTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      newMessage: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(3000)]]
    });

    this.topicSubscription = this.sujetService.topicsSubject.subscribe((topics: Sujet[]) => {
      this.listeSujetsObjets = topics;
    });
    this.sujetService.emitTopics();
    this.sujetService.recupSujet();

    this.usersSubscription = this.userservice.usersSubject.subscribe((users: User[]) => {
      this.listeUsers = users;
    });
    this.userservice.emitUsers();
    this.userservice.recupAllUsers();

    setTimeout(() => {
      this.updateDisp();
    },1);

    AppComponent.setMenuPosition(0);

  }

  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
  }

  onSubmitNewSubject(): void {
    console.log(this.newSubjectForm.value);
  }

  onFilterInput(event: any) {
    this.updateDisp();
    console.log(event.target.value);
  }

  convertTimestamp(timestamp: number): string {
    let newDate = new Date(timestamp* 1000);
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();
    return day + '/' + month + '/' + year;
  }

  updateDisp(): void {
    const listeSujetDiv = document.getElementById("listeSujets")!;
    listeSujetDiv.innerHTML = "";
    const popup = document.createElement("div");
    const popupContent = document.createElement("span");
    popup.appendChild(popupContent);

    for (let element of this.listeSujetsObjets) {
      const sujet = document.createElement("div");
      sujet.setAttribute("style", "display: grid; grid-template-columns: 1fr 100px 100px; grid-column-gap: var(--marge); margin-top: var(--marge)");
  
      const sujetTitre = document.createElement("h3");
      sujetTitre.textContent = element.title;
      sujetTitre.setAttribute("style", "display: inline; font-size: 1.3em; color: var(--bleu-claire); margin: auto 0.2em;")
      
      sujetTitre.addEventListener("click", event => {
        this.router.navigate([`sujetDetails/${element.id}`]);
      })
      sujetTitre.addEventListener("mouseover", event => {
        popupContent.innerHTML = `Posté par ${element.author.username}<br>le ${this.convertTimestamp(element.date)}`;
      });
  
      sujetTitre.addEventListener("mousemove", event => {
          let posX = event.clientX + 20;
          let posY = event.clientY + 20;
          popup.setAttribute("style", `left: ${posX}px; top: ${posY}px; background-color: darkslateblue; color: #ffffff; padding: 0.5em 0.5em; border-radius: 0.3em; position: absolute;`);
      });
  
      sujetTitre.addEventListener("mouseout", event => {  
        //popup.setAttribute("class", "popup invisible");
        popup.setAttribute("style","display: none;");
      });
  
      const modifTitre = document.createElement("input");
      modifTitre.setAttribute("type", "text");
      //modifTitre.setAttribute("class", "modif_titre invisible");
      modifTitre.setAttribute("style","display: none;");
  
      let modifMode = false
  
      const boutonModif = document.createElement("button");
      boutonModif.textContent = "Modifier";
      //boutonModif.setAttribute("class", "bouton_modif");
      boutonModif.setAttribute("style", "padding: 0.5em; color: #ffffff; background-color: var(--bleu-claire); border: 3px solid var(--bleu); width: 100%;");
  
      boutonModif.addEventListener("click", event => {
          if (modifMode === false) {
              boutonModif.textContent = "Enrgistrer";
              // boutonModif.setAttribute("class", "bouton_enregistre");
              // sujetTitre.setAttribute("class", "invisible");
              // modifTitre.setAttribute("class", "modif_titre");
              boutonModif.setAttribute("style", "padding: 0.5em; color: #ffffff; background-color:mediumseagreen; border: 3px solid forestgreen; width: 100%;");
              sujetTitre.setAttribute("style", "display: none;");
              modifTitre.setAttribute("style", " ");
              modifMode = true;
          } else {
              boutonModif.textContent = "Modifier";
              // boutonModif.setAttribute("class", "bouton_modif");
              // sujetTitre.setAttribute("class", "accueil");
              // modifTitre.setAttribute("class", "invisible");
              boutonModif.setAttribute("style", "padding: 0.5em; color: #ffffff; background-color: var(--bleu-claire); border: 3px solid var(--bleu); width: 100%;");
              sujetTitre.setAttribute("style", "display: inline; font-size: 1.3em; color: var(--bleu-claire); margin: auto 0.2em;");
              modifTitre.setAttribute("style", "display: none;");
              modifMode = false;
          }
      });
  
  
  
      const boutonSupp = document.createElement("button");
      boutonSupp.textContent = "Supprimer";
      // boutonSupp.setAttribute("class", "bouton_supp");
      boutonSupp.setAttribute("style", "padding: 0.5em; color: #ffffff; background-color: indianred; border: 3px solid red; width: 100%;");
  
      boutonSupp.addEventListener("click", event => {
  
      });
      
  
      sujet.appendChild(sujetTitre);
      sujet.appendChild(modifTitre);
      sujet.appendChild(boutonModif);
      sujet.appendChild(boutonSupp);
      sujet.appendChild(popup);
      listeSujetDiv.appendChild(sujet);
  
    };
  }

  redirectToSujetDetails(topic_id_selected: number) : void {
    this.router.navigate(['sujetDetails', topic_id_selected]);
  }

}
