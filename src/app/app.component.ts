import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import Quill from 'quill';

// Configuración de fuentes personalizadas para Quill
const Font = Quill.import('formats/font');
// Definir la lista de fuentes (solo la nuestra)
Font.whitelist = ['neue-plak']; 
Quill.register(Font, true);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Editor de Texto Enriquecido con Quill (Neue Plak)';
  
  // Configuración del editor con solo colores corporativos
  quillConfig = {
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
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
    console.log('Editor inicializado con la fuente Neue Plak y colores corporativos');
  }
  
  ngAfterViewInit() {
    // Ejecutar después de que la vista se ha inicializado completamente
    setTimeout(() => {
      this.configurarFuente();
    }, 500);
  }
  
  configurarFuente() {
    try {
      // Configurar el selector de fuentes para mostrar "Neue Plak"
      const fontSelector = document.querySelector('.ql-font.ql-picker');
      if (fontSelector) {
        const fontLabel = fontSelector.querySelector('.ql-picker-label');
        if (fontLabel) {
          fontLabel.setAttribute('data-value', 'neue-plak');
          
          // Limpiar cualquier texto existente
          Array.from(fontLabel.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
              node.nodeValue = '';
            }
          });
        }

        // Configurar los elementos del dropdown
        const fontItems = fontSelector.querySelectorAll('.ql-picker-item');
        fontItems.forEach(item => {
          if (item.getAttribute('data-value') === 'neue-plak') {
            item.setAttribute('data-selected', 'true');
            item.textContent = 'Neue Plak';
          }
        });
      }
      
      // Aplicar la fuente al contenido existente
      const editor = document.querySelector('.ql-editor');
      if (editor) {
        editor.classList.add('ql-font-neue-plak');
      }
    } catch (error) {
      console.error('Error al configurar la fuente:', error);
    }
  }
  
  // Método para obtener el contenido del editor
  onEditorContentChange(event: any) {
    this.editorContent = event.html;
    console.log('Editor content changed:', this.editorContent);
  }
  
  // Método para guardar el contenido
  saveContent() {
    console.log('Contenido guardado:', this.editorContent);
    // Aquí puedes implementar la lógica para guardar el contenido
  }
}