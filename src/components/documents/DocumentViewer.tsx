import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { Document, Page, pdfjs } from 'react-pdf';
import { documentsApi } from '../../services/documents';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  isOpen,
  onClose,
  documentId
}) => {
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadDocument = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading document:', documentId);
        
        const doc = await documentsApi.getDocument(documentId);
        console.log('Document loaded successfully');
        
        if (doc.encoded_file) {
          // The encoded_file is already base64 encoded from the API
          setPdfData(`data:application/pdf;base64,${doc.encoded_file}`);
        } else {
          throw new Error('No document content available');
        }
      } catch (err: any) {
        console.error('Document load error:', err);
        setError(err.message || 'Failed to load document');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && documentId) {
      loadDocument();
    }

    return () => {
      setPdfData(null);
    };
  }, [documentId, isOpen]);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return Math.max(1, Math.min(numPages || 1, newPageNumber));
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // TODO: Implement chat functionality
    setMessage('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
      <div className="flex h-[80vh]">
        {/* Document Section */}
        <div className="w-2/3 flex flex-col">
          <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="h-full flex items-center justify-center text-red-400">
                {error}
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <Document
                  file={pdfData}
                  onLoadSuccess={handleDocumentLoadSuccess}
                  className="flex-1 overflow-auto"
                  loading={
                    <div className="h-full flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  }
                  error={
                    <div className="h-full flex items-center justify-center text-red-400">
                      Failed to load PDF
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    className="mx-auto"
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
                <div className="flex items-center justify-center gap-4 p-4 border-t border-gray-700">
                  <button
                    onClick={() => changePage(-1)}
                    disabled={pageNumber <= 1}
                    className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm">
                    Page {pageNumber} of {numPages}
                  </span>
                  <button
                    onClick={() => changePage(1)}
                    disabled={pageNumber >= (numPages || 1)}
                    className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-1/3 ml-4 flex flex-col">
          <div className="flex-1 bg-gray-800 rounded-lg p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-sm">
                  Hello! I can help you understand this document. What would you like to know?
                </p>
                <span className="text-xs text-gray-400 mt-1 block">AI Assistant</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSendMessage} className="mt-4">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a question..."
                className="w-full bg-gray-800 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-cyan-400 hover:text-cyan-300"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};