import { useCallback, useRef, useState } from "react";
import { Document, Page } from 'react-pdf'
import { pdfjs } from 'react-pdf';
import { useResizeObserver } from '@wojtekmaj/react-hooks';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

import "./Regs.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const resizeObserverOptions = {};
// const maxWidth = 800;

export const Regs = () => {
  const ref = useRef(0);
  ref.current += 1;
  console.log("%Regs render:" + ref.current.toString(), "color: yellow");

  const [file, setFile] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(300);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width/3);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  const contentsMap = [
    {
      name: 'Region 1: Vancouver Island',
      link: 'region1_vancouver_island.pdf'
    },
    {
      name: 'Region 2: Lower Mainland',
      link: 'region2_lower_mainland.pdf'
    },
    {
      name: 'Region 3: Thompson',
      link: 'region3_Thompson.pdf'
    },
    {
      name: 'Region 4: Kootenay',
      link: 'region4_kootenay.pdf'
    },
    {
      name: 'Region 5: Cariboo',
      link: 'region5_cariboo.pdf'
    },
    {
      name: 'Region 6: Skeena',
      link: 'region6_skeena.pdf'
    },
    {
      name: 'Region 7a: Omineca',
      link: 'region7a_omineca.pdf'
    },
    {
      name: 'Region 7b: Peace',
      link: 'region7b_peace.pdf'
    },
    {
      name: 'Region 8: Okanagan',
      link: 'region8_okanagan.pdf'
    },
  ]

  return (
    <div className="regs-component">
      <div className="regs-document" ref={setContainerRef}>
        <Document 
          file={file} 
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={
            (error) => console.error('Error occurred while loading document:', error.message)}>
          <Page 
            pageNumber={pageNumber}
            renderAnnotationLayer={false} 
            renderTextLayer={false}
            width={containerWidth}
          />
        </Document>
        {file && 
          <div>
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              Previous
            </button>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
              Next
            </button>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        }
      </div>
      <div className="table-of-contents">
        <h1>Regulations</h1>
        <span onClick={() => setFile("hunting-trapping-synopsis.pdf")} className="link">
          <div className="pdf">Full Hunting and Trapping Regulations Synopsis 2022-2024</div>
        </span>
        <h2 className="title">
          Contents By Region
        </h2>
        {contentsMap.map((content) => {
        return (
          <span onClick={() => setFile(content.link)} className="link">
            <div>
              {content.name}
            </div>
          </span>
          )
        })}
      </div>
    </div>
)}
