import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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

// NOTE: Custom blot para divisor <hr>
const BlockEmbed = Quill.import('blots/block/embed');
class DividerBlot extends BlockEmbed {
  static blotName = 'divider';
  static tagName = 'hr';
}
Quill.register(DividerBlot);

// NOTE: Custom blot para cuadro de texto
const Block = Quill.import('blots/block');
class TextBoxBlot extends Block {
  static blotName = 'textbox';
  static className = 'ql-textbox';
  static tagName = 'div';

  static create(value: any) {
    const node = super.create(value);
    node.setAttribute('class', 'ql-textbox');
    return node;
  }
}
Quill.register(TextBoxBlot);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'Quill: Editor de Texto Enriquecido';

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
          ['link', 'image'],
          ['divider'], // NOTE: Botón para insertar el divisor
          ['textbox'] // NOTE: Botón para cuadro de texto
        ],
        handlers: {
          // NOTE: Handler personalizado para insertar el divisor
          divider: function(this: any) {
            const range = this.quill.getSelection(true);
            this.quill.insertEmbed(range.index, 'divider', true, Quill.sources.USER);
            // Opcional: mueve el cursor después del divisor
            this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
          },
          // NOTE: Handler para insertar cuadro de texto
          textbox: function(this: any) {
            const range = this.quill.getSelection(true);
            this.quill.insertText(range.index, '\n', Quill.sources.USER);
            this.quill.insertEmbed(range.index + 1, 'textbox', true, Quill.sources.USER);
            this.quill.insertText(range.index + 2, '\n', Quill.sources.USER);
            this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
          }
        }
      }
    },
    theme: 'snow'

  };

  // Contenido del editor
  editorContent = '';
  safeEditorContent: SafeHtml = ''; // NOTE: corrección de error en vista previa

  constructor(private sanitizer: DomSanitizer) { } // NOTE: corrección de error en vista previa

  ngOnInit() {
    console.log('Editor personalizado');
  }

  // Método para obtener el contenido del editor
  // NOTE: Corrección de error al obtener el contenido
  /* onEditorContentChange(event: any) {
    this.editorContent = event.html;
    console.log('Contenido del editor modificado:', this.editorContent);
  } */
  onEditorContentChange(event: any) {
    this.editorContent = event.html;
    this.safeEditorContent = this.sanitizer.bypassSecurityTrustHtml(this.editorContent);
    console.log('Contenido del editor modificado:', this.editorContent);
  }

  // Método para guardar el contenido
  saveContent() {
    console.log('Contenido guardado:', this.editorContent);
    // Aquí puedes implementar la lógica para guardar el contenido
  }

}

