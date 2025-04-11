import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Editor de Texto Enriquecido con Quill';
  
  // Contenido del editor
  editorContent = '';
  
  // Método para obtener el contenido del editor
  onEditorContentChange(event: any) {
    this.editorContent = event.html;
    console.log('Editor content changed:', this.editorContent);
  }
  
  // Método para guardar el contenido
  saveContent() {
    console.log('Contenido guardado:', this.editorContent);
    //TODO: Aquí se puede implementar la lógica para guardar el contenido
  }
}