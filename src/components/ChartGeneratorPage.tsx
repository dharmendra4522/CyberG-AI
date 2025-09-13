import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Apni local files ko yahan import karein
import sheetIconImage from "../assets/googleSheet.png";
import excelIconImage from "../assets/excel.png";
import demoVideo from "../assets/demo-video.mp4";
import VibeChartPage from "./VibeChartPage";
import Auth from "../pages/Auth";
// --- Icon Components (Styling updated to match your theme) ---
const SheetIcon = () => (
  <img src={sheetIconImage} alt="Sheet Icon" className="w-5 h-5 mr-2" />
);
const ExcelIcon = () => (
  <img src={excelIconImage} alt="Excel Icon" className="w-5 h-5 mr-2" />
);
const UploadIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    ></path>
  </svg>
);
const ImageIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    ></path>
  </svg>
);
const PasteIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    ></path>
  </svg>
);
const SendIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    ></path>
  </svg>
);
const LinkIcon = () => (
  <svg
    className="w-5 h-5 text-muted-foreground"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    ></path>
  </svg>
);

// --- Reusable Components (Updated with your theme's classes) ---
const ActionButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground border rounded-md hover:bg-muted transition-all duration-200 text-sm font-medium"
  >
    {icon}
    {text}
  </button>
);
type SuggestionChipProps = {
  icon?: React.ReactNode;
  text: React.ReactNode;
};

const SuggestionChip: React.FC<SuggestionChipProps> = ({ icon, text }) => (
  <button className="flex items-center px-3 py-1.5 bg-card text-muted-foreground border rounded-md hover:bg-muted transition-all duration-200 text-xs">
    {icon && <div className="mr-2">{icon}</div>}
    {text}
  </button>
);

// --- Modal Component (Updated with your theme's classes) ---
const ImportSheetModal = ({ isOpen, onClose }) => {
  const [link, setLink] = useState("");
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Importing link:", link);
    alert(`Importing from Google Sheets link:\n${link}`);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/80">
      <div
        className="relative bg-card p-8 rounded-lg shadow-cyber w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-foreground">
            Import from Google Sheets
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl"
          >
            &times;
          </button>
        </div>
        <p className="text-muted-foreground mb-6">
          Paste the link from your Google Sheets with link access set to "Anyone
          who has link".
        </p>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LinkIcon />
          </div>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Paste link"
            className="w-full py-3 pl-10 pr-4 bg-input text-foreground border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-all duration-300"
        >
          Import
        </button>
      </div>
    </div>,
    document.body
  );
};

// --- Main Page Component (Updated with your theme's classes) ---
function ChartGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // <-- YEH NAYI LINE ADD KAREIN
  const fileInputRef = useRef(null);
  const excelInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // <-- YEH NAYI LINE ADD KAREIN


 // Is poore function ko replace karein
const checkAuthAndProceed = (action: () => void) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
      action();
  } else {
      // Naya: Redirect ke saath message aur 'from' path bhejein
      navigate('/auth', { 
          state: { 
              message: "Please log in or create an account to use this feature.",
              from: location.pathname // Batao ki hum kahan se aaye hain
          } 
      });
  }
};

  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     console.log("Selected file:", file);
  //     navigate("/vibe-chart", { state: { uploadedFile: file } });
  //   }
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        console.log("Selected file:", file.name);
        setSelectedFile(file); // File ko state mein save karein
    }
};

  const handleUploadButtonClick = () => {
    checkAuthAndProceed(() => {
      fileInputRef.current?.click();
    });
  };

  const handleExcelUploadClick = () => {
    checkAuthAndProceed(() => {
      excelInputRef.current?.click();
    });
  };

  const handlePasteClick = () => {
    checkAuthAndProceed(() => {
      toast({
        title: "Coming soon",
        description: "Pasting from clipboard is coming soon! 🚧",
      });
    });
  };

  // const handlePromptSubmit = () => {
  //   checkAuthAndProceed(() => {
  //     // Yahan aap file aur prompt ke saath redirect karne ka logic daal sakte hain
  //     console.log("Submitted Prompt:", prompt);
  //     toast({
  //       title: "Started",
  //       description: "Chart generation started!",
  //     });
  //   });
  // };

  const handleGenerateChart = () => {
    if (!selectedFile) {
        alert("Please upload an Excel file first.");
        return;
    }
    if (!prompt) {
        alert("Please describe the chart you want to create from the file.");
        return;
    }
    console.log("Redirecting with:", { file: selectedFile.name, prompt: prompt });
    // File aur prompt dono ko VibeChartPage par bhejo
    navigate('/vibe-chart', { state: { uploadedFile: selectedFile, userPrompt: prompt } });
};

  return (
    <div className="min-h-screen flex justify-center bg-background p-6 pt-20">
      <ImportSheetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        type="file"
        ref={excelInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".xlsx, .xls"
      />

      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Turn Data into{" "}
            <span className="text-gradient">Stunning Charts</span> in Seconds
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Instantly create a custom chart or diagram with AI. Transform
            complex data into beautiful visuals and powerful insights with
            VibeChart.
          </p>
        </div>

        {/* UPDATED: Margin top add kiya gaya hai */}
        <div className="mt-8 bg-card p-6 rounded-lg shadow-elevated border">
          <div className="flex flex-wrap gap-4 mb-8">
            <ActionButton
              onClick={() => checkAuthAndProceed(() => setIsModalOpen(true))}
              icon={<SheetIcon />}
              text="Import Sheets"
            />
            <ActionButton
              onClick={handleExcelUploadClick}
              icon={<ExcelIcon />}
              text="Upload Excel"
            />
            <ActionButton
              onClick={handleUploadButtonClick}
              icon={<UploadIcon />}
              text="Upload File (.csv, .pdf)"
            />
            <ActionButton
              onClick={handleUploadButtonClick}
              icon={<ImageIcon />}
              text="Add Image"
            />
            <ActionButton
              onClick={handlePasteClick}
              icon={<PasteIcon />}
              text="Paste data"
            />
          </div>
          
          {/* File Upload Status */}
          {selectedFile && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">File uploaded successfully!</p>
                  <p className="text-sm text-green-600">{selectedFile.name}</p>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="ml-auto text-green-600 hover:text-green-800"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Make a pie chart of my spending..."
              className="w-full h-28 p-4 pr-16 bg-input text-foreground border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <button
              onClick={handleGenerateChart}

              disabled={!selectedFile || !prompt.trim()}
              className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                selectedFile && prompt.trim() 
                  ? 'bg-foreground text-background hover:bg-foreground/80' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              <SendIcon />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <SuggestionChip text="{ } Japan population decline in 30 years" />
          <SuggestionChip
            icon={<ImageIcon />}
            text="Pie chart from the image"
          />
          <SuggestionChip icon={<ImageIcon />} text="Users by age group" />
          <SuggestionChip text="📈 Monthly Revenue, Expenses & Profit chart" />
          <SuggestionChip text="Avg purchase heatmap by age & income" />
        </div>

        <div className="mt-24">
          <div className="bg-card p-4 rounded-lg shadow-elevated border">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <video
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={demoVideo}
                controls
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartGeneratorPage;
