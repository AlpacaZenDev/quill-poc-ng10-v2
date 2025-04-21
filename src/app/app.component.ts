import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Quill from 'quill';

// Configuración de fuentes personalizadas para Quill
const Font = Quill.import('formats/font');
// Definir la lista de fuentes (solo la nuestra)
Font.whitelist = ['neue-plak'];
Quill.register(Font, true);

// TODO: Selector del tamaño de fuente:
// Personalizar opciones de tamaño
const Size = Quill.import('attributors/style/size');
// Definir tamaños numéricos personalizados en puntos
Size.whitelist = ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '24px'];
Quill.register(Size, true);
// TODO: End

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'Editor de Texto Enriquecido con Quill';

  // Configuración del editor con solo colores corporativos
  quillConfig = {
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          // TODO: Selector del tamaño de fuente:
          [{ 'size': ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '24px'] }],
          // [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'font': ['neue-plak'] }],
          [{ 'color': ['#ffffff', '#212322', '#007bff', '#dc3545', '#28a745',
                      '#ffc107', '#17a2b8', '#fd7e14', '#6610f2', '#6f42c1',
                      '#e83e8c', '#20c997', '#813788', '#f8f9fa', '#adb5bd', '#212529'] },
           { 'background': ['#ffffff', '#212322', '#007bff', '#dc3545', '#28a745',
                           '#ffc107', '#17a2b8', '#fd7e14', '#6610f2', '#6f42c1',
                           '#e83e8c', '#20c997', '#813788', '#f8f9fa', '#adb5bd', '#212529'] }],
          [{ 'align': [] }],
          ['clean'],
          ['link', 'image']
        ]
      }
    },
    theme: 'snow'

  };

  // Contenido del editor
  editorContent = '';

  constructor() { }

  ngOnInit() {
    console.log('Editor personalizado');
  }

  // Método para obtener el contenido del editor
  onEditorContentChange(event: any) {
    this.editorContent = event.html;
    console.log('Contenido del editor modificado:', this.editorContent);
  }

  // Método para guardar el contenido
  saveContent() {
    console.log('Contenido guardado:', this.editorContent);
    // Aquí puedes implementar la lógica para guardar el contenido
  }

}

