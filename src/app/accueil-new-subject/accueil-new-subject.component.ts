import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sujet } from "../modeles/sujet";
import { SujetDetailsComponent } from '../sujet-details/sujet-details.component';

@Component({
  selector: 'app-accueil-new-subject',
  templateUrl: './accueil-new-subject.component.html',
  styleUrls: ['./accueil-new-subject.component.css']
})

export class AccueilNewSubjectComponent implements OnInit {
  newSubjectForm!: FormGroup;
  listSujetDiv: any = document.getElementById("listSujets");
  listSujetsObjets: Sujet[] = [];// = [new Sujet(0, "Coucou", "18/06/2021", "Thomas"),new Sujet(0, "Qui est la maman de Oui-Oui ????", "01/01/0000", "Jesus"),new Sujet(0, "Le groupe 2 est le meilleur !", "08/07/2021", "Soufiane")];

  constructor(private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.newSubjectForm = this.formBuilder.group({
      newTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      newMessage: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(3000)]]
    });

  

    const popup = document.createElement("div");
    popup.setAttribute("class", "popup invisible");
    popup.setAttribute("style", "left: 80px; top: 80px;");
    const popupContent = document.createElement("p");
    popup.appendChild(popupContent);

    // this.listSujetsObjets.forEach(element => {
    for (let element of this.listSujetsObjets) {
      const sujet = document.createElement("div");
      sujet.setAttribute("class", "sujet");
  
      const sujetTitre = document.createElement("h3");
      sujetTitre.textContent = element.title;
      sujetTitre.setAttribute("class", "accueil")
  
      sujetTitre.addEventListener("mouseover", event => {
          console.log(event);
          popupContent.innerHTML = `Posté par ${element.author_id}<br>le ${element.date}`;
          popup.setAttribute("class", "popup");
      });
  
      sujetTitre.addEventListener("mousemove", event => {
          let posX = event.clientX + 10;
          let posY = event.clientY + 10;
          popup.setAttribute("style", `left: ${posX}px; top: ${posY}px;`);
      });
  
      sujetTitre.addEventListener("mouseout", event => {
          popup.setAttribute("class", "popup invisible");
      });
  
      const modifTitre = document.createElement("input");
      modifTitre.setAttribute("type", "text");
      modifTitre.setAttribute("class", "modif_titre invisible");
  
  
      let modifMode = false
  
      const boutonModif = document.createElement("button");
      boutonModif.textContent = "Modifier";
      boutonModif.setAttribute("class", "bouton_modif");
  
      boutonModif.addEventListener("click", event => {
          console.log(event);
          if (modifMode === false) {
              boutonModif.textContent = "Enrgistrer";
              boutonModif.setAttribute("class", "bouton_enregistre");
              sujetTitre.setAttribute("class", "invisible");
              modifTitre.setAttribute("class", "modif_titre");
              modifMode = true;
          } else {
              boutonModif.textContent = "Modifier";
              boutonModif.setAttribute("class", "bouton_modif");
              sujetTitre.setAttribute("class", "accueil");
              modifTitre.setAttribute("class", "modif_titre invisible");
              modifMode = false;
          }
      });
  
  
  
      const boutonSupp = document.createElement("button");
      boutonSupp.textContent = "Supprimer";
      boutonSupp.setAttribute("class", "bouton_supp");
  
      boutonSupp.addEventListener("click", event => {
  
      });
      
  
      sujet.appendChild(sujetTitre);
      sujet.appendChild(modifTitre);
      sujet.appendChild(boutonModif);
      sujet.appendChild(boutonSupp);
      this.listSujetDiv.appendChild(sujet);
  
  };
  }

  onSubmitNewSubject(): void {
    console.log(this.newSubjectForm.value);
  }

  onFilterInput(event: any) {
    console.log(event.target.value);
  }

}
