import React, {FC} from 'react';
import ReactDOM from 'react-dom';

interface IPropsWindowScope {
  children: any;
}

const WindowScope: FC<IPropsWindowScope> = (props: IPropsWindowScope) => {
  const containerEl = React.useRef(document.createElement('div'));
  const externalWindow = React.useRef(null);

  function copyStyles(src, dest) {
    Array.from(src.styleSheets).forEach(() => {
      // dest.head.appendChild(styleSheet.ownerNode.cloneNode(true))
    });
    Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
  }
  React.useEffect(() => {
    externalWindow.current = window.open('', '', 'width=600,height=400,left=200,top=200');
    externalWindow.current.document.title = 'Pdf Render';
    const currentWindow = externalWindow.current;
    if (currentWindow) {
      currentWindow.document.body.appendChild(containerEl.current);
      return () => currentWindow.close();
    }
    copyStyles(document, externalWindow.current.document);
  }, []);

  return ReactDOM.createPortal(props.children, containerEl.current);
};
export default WindowScope;
