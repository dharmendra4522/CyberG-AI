
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';


// --- Icon Components ---
const ExcelFileIcon = () => ( <svg style={{width: '1.5rem', height: '1.5rem', color: 'var(--primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> );
const CheckCircleIcon = ({ completed }) => ( <svg style={{ width: '1.25rem', height: '1.25rem', color: completed ? 'var(--primary)' : 'var(--muted-foreground)' }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> );
const SpinnerIcon = () => ( <svg style={{ animation: 'spin 1s linear infinite', width: '1.25rem', height: '1.25rem', color: 'var(--primary)' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> );
const CloseIcon = () => ( <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> );
const CopyIcon = () => ( <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> );
const ExportIcon = () => ( <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg> );


// --- Redesigned Modal Component ---
const ChartDetailModal = ({ isOpen, onClose, chartData }) => {
    const [isResizing, setIsResizing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [resizeDirection, setResizeDirection] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: 800, height: 550 });
    const [shouldRenderChart, setShouldRenderChart] = useState(false);
    const [inputSize, setInputSize] = useState({ width: String(size.width), height: String(size.height) });
    const [copyButtonText, setCopyButtonText] = useState('Copy link');

    const startPoint = useRef({ x: 0, y: 0 });
    const startSize = useRef({ width: 0, height: 0 });
    const startPosition = useRef({ x: 0, y: 0 });
    const chartToExportRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setPosition({
                x: (window.innerWidth / 2) - (size.width / 2) - 160,
                y: (window.innerHeight / 2) - (size.height / 2),
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setShouldRenderChart(true), 100);
            return () => clearTimeout(timer);
        } else {
            setShouldRenderChart(false);
        }
    }, [isOpen]);

    useEffect(() => {
        setInputSize({
            width: String(Math.round(size.width)),
            height: String(Math.round(size.height))
        });
    }, [size]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isResizing) {
                let newWidth = startSize.current.width;
                let newHeight = startSize.current.height;
                let newX = startPosition.current.x;
                let newY = startPosition.current.y;
                const deltaX = e.clientX - startPoint.current.x;
                const deltaY = e.clientY - startPoint.current.y;
                if (resizeDirection.includes('right')) newWidth += deltaX;
                if (resizeDirection.includes('left')) { newWidth -= deltaX; newX += deltaX; }
                if (resizeDirection.includes('bottom')) newHeight += deltaY;
                if (resizeDirection.includes('top')) { newHeight -= deltaY; newY += deltaY; }
                if (newWidth > 500) setSize(s => ({ ...s, width: newWidth }));
                if (newHeight > 400) setSize(s => ({ ...s, height: newHeight }));
                if ((resizeDirection.includes('left')) && newWidth > 500) setPosition(p => ({ ...p, x: newX }));
                if ((resizeDirection.includes('top')) && newHeight > 400) setPosition(p => ({ ...p, y: newY }));
            } else if (isDragging) {
                setPosition({
                    x: startPosition.current.x + (e.clientX - startPoint.current.x),
                    y: startPosition.current.y + (e.clientY - startPoint.current.y),
                });
            }
        };
        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, resizeDirection]);

    const handleResizeMouseDown = (e, direction) => {
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
        startPoint.current = { x: e.clientX, y: e.clientY };
        startSize.current = { ...size };
        startPosition.current = { ...position };
    };

    const handleDragMouseDown = (e) => {
        if (e.target.id !== 'modal-title-bar' && !e.target.closest('#modal-title-bar')) return;
        setIsDragging(true);
        startPoint.current = { x: e.clientX, y: e.clientY };
        startPosition.current = { ...position };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            setInputSize(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        let numericValue = parseInt(value, 10);
        if (isNaN(numericValue) || numericValue <= 0) {
            numericValue = size[name];
        }
        if (name === 'width' && numericValue < 500) numericValue = 500;
        if (name === 'height' && numericValue < 400) numericValue = 400;
        setSize(prev => ({ ...prev, [name]: numericValue }));
    };

    const handleExport = () => {
        if (chartToExportRef.current) {
            html2canvas(chartToExportRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
            }).then(canvas => {
                canvas.toBlob(blob => {
                    if (blob) {
                        saveAs(blob, 'chart.png');
                    }
                });
            });
        }
    };

    const handleCopyLink = async () => {
        const linkToCopy = "https://app.vibechart.ai/shares/...";

        // First, check if the Clipboard API is available and the context is secure
        if (!navigator.clipboard || !window.isSecureContext) {
            console.error("Clipboard API not available. Please use a secure context (HTTPS or localhost).");
            setCopyButtonText('Not Supported');
            setTimeout(() => {
                setCopyButtonText('Copy link');
            }, 2000);
            return; // Exit the function early
        }

        // If the check passes, proceed with copying
        try {
            await navigator.clipboard.writeText(linkToCopy);
            setCopyButtonText('Copied!');
            setTimeout(() => {
                setCopyButtonText('Copy link');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopyButtonText('Failed!');
            setTimeout(() => {
                setCopyButtonText('Copy link');
            }, 2000);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)', zIndex: 50, userSelect: 'none' }}>
            <div
                className="bg-card rounded-lg shadow-cyber"
                style={{ position: 'absolute', width: size.width, height: size.height, left: position.x, top: position.y, display: 'flex', flexDirection: 'column' }}
            >
                <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '16px', backgroundColor: 'rgba(51, 48, 48, 0.64)', borderRadius: '10px', cursor: 'ns-resize', zIndex: 60 }} onMouseDown={(e) => handleResizeMouseDown(e, 'top')}></div>
                <div style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '16px', backgroundColor: 'rgba(51, 48, 48, 0.64)', borderRadius: '10px', cursor: 'ns-resize', zIndex: 60 }} onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}></div>
                <div style={{ position: 'absolute', top: '50%', left: '-25px', transform: 'translateY(-50%)', width: '16px', height: '120px', backgroundColor: 'rgba(51, 48, 48, 0.64)', borderRadius: '10px', cursor: 'ew-resize', zIndex: 60 }} onMouseDown={(e) => handleResizeMouseDown(e, 'left')}></div>
                <div style={{ position: 'absolute', top: '50%', right: '-25px', transform: 'translateY(-50%)', width: '16px', height: '120px', backgroundColor: 'rgba(51, 48, 48, 0.64)', borderRadius: '10px', cursor: 'ew-resize', zIndex: 60 }} onMouseDown={(e) => handleResizeMouseDown(e, 'right')}></div>
                <div id="modal-title-bar" className="border-b" style={{ height: '2.5rem', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', flexShrink: 0 }} onMouseDown={handleDragMouseDown}>
                    <span style={{ fontWeight: 600 }} className="text-foreground">Chart Details</span>
                </div>
                <div ref={chartToExportRef} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem', overflow: 'hidden', backgroundColor: 'var(--card)' }}>
                    <div style={{ flexShrink: 0 }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }} className="text-foreground">Weekly Task Schedule</h2>
                        <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }} className="text-muted-foreground">The chart visualizes the weekly schedule...</p>
                    </div>
                    <div style={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
                        {shouldRenderChart && (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis dataKey="name" stroke="var(--foreground)" />
                                    <YAxis stroke="var(--foreground)" />
                                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                                    <Bar dataKey="tasks">
                                        {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
            
            <div style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: '320px', backgroundColor: '#343538ff', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '3rem', overflowY: 'auto', zIndex: 10, borderLeft: '1px solid var(--border)', boxShadow: '-10px 0 20px -10px rgba(0,0,0,0.1)'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white' }} className="text-foreground">Export Image</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white' }} className="text-muted-foreground hover:text-foreground"><CloseIcon /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontWeight: 500, fontSize: '0.875rem', color: 'white' }} className="text-foreground">CUSTOM SIZE</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="text" name="width" value={inputSize.width} onChange={handleInputChange} onBlur={handleInputBlur} style={{ width: '100%', backgroundColor: 'var(--input)', border: '1px solid var(--border)', borderRadius: '0.375rem', padding: '0.25rem 0.5rem', fontSize: '0.875rem', color: 'white' }} className="text-foreground" />
                        <span className="text-muted-foreground" style={{ color: 'white' }}>px</span>
                        <input type="text" name="height" value={inputSize.height} onChange={handleInputChange} onBlur={handleInputBlur} style={{ width: '100%', backgroundColor: 'var(--input)', border: '1px solid var(--border)', borderRadius: '0.375rem', padding: '0.25rem 0.5rem', fontSize: '0.875rem', color: 'white' }} className="text-foreground" />
                        <span className="text-muted-foreground" style={{ color: 'white' }}>px</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: 'white', color: 'black', fontSize: '0.875rem', padding: '0.5rem 0', borderRadius: '0.375rem', border: 'none' }}> <CopyIcon/> Copy</button>
                        <button onClick={handleExport} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: 'white', color: 'black', fontSize: '0.875rem', padding: '0.5rem 0', borderRadius: '0.375rem', border: 'none' }}> <ExportIcon/> Export</button>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontWeight: 500, fontSize: '0.875rem', color: 'white' }} className="text-foreground">Link</label>
                    <p style={{ fontSize: '0.75rem', color: 'white' }} className="text-muted-foreground">Use this link to share your chart.</p>
                    <input type="text" readOnly value="https://app.vibechart.ai/shares/..." style={{ width: '100%', backgroundColor: 'var(--input)', border: '1px solid var(--border)', borderRadius: '0.375rem', padding: '0.25rem 0.5rem', fontSize: '0.875rem', color: 'white' }} className="text-foreground" />
                    <button onClick={handleCopyLink} style={{ width: '100%', backgroundColor: 'white', color: 'black', fontSize: '0.875rem', padding: '0.5rem 0', borderRadius: '0.375rem', border: 'none' }}>
                        {copyButtonText}
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontWeight: 500, fontSize: '0.875rem', color: 'white' }} className="text-foreground">Embed code</label>
                    <p style={{ fontSize: '0.75rem', color: 'white' }} className="text-muted-foreground">Generates an embed code to add this VibeChart to your own website.</p>
                    <button style={{ width: '100%', backgroundColor: 'white', color: 'black', fontSize: '0.875rem', padding: '0.5rem 0', borderRadius: '0.375rem', border: 'none' }}>Copy embed code</button>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---
function VibeChartPage() {
    const location = useLocation();
    const uploadedFile = location.state?.uploadedFile;

    const [status, setStatus] = useState('processing');
    const [processingSteps, setProcessingSteps] = useState([
        { id: 1, text: "Drawing chart", completed: false, inProgress: true },
        { id: 2, text: "Validating JS code and chart data...", completed: false, inProgress: false },
    ]);
    const [chartData, setChartData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const processFile = async () => {
            await new Promise(res => setTimeout(res, 1500));
            setProcessingSteps(prev => prev.map(p => p.id === 1 ? { ...p, completed: true, inProgress: false } : p));
            setProcessingSteps(prev => prev.map(p => p.id === 2 ? { ...p, inProgress: true } : p));
            await new Promise(res => setTimeout(res, 2000));
            setProcessingSteps(prev => prev.map(p => p.id === 2 ? { ...p, completed: true, inProgress: false } : p));
            const finalChartData = [
                { name: 'Mon-Wed', tasks: 4.2, color: '#8b5cf6' },
                { name: 'Thu-Fri', tasks: 4.1, color: '#ec4899' },
                { name: 'Sat-Sun', tasks: 5.8, color: '#3b82f6' },
            ];
            setChartData(finalChartData);
            setStatus('success');
        };
        if (uploadedFile) {
            processFile();
        } else {
            setStatus('idle');
        }
    }, [uploadedFile]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <ChartDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} chartData={chartData} />
            <div style={{ width: '100%', maxWidth: '56rem' }}>
                <div className="bg-card border rounded-lg shadow-sm" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ExcelFileIcon />
                        <span style={{ marginLeft: '0.75rem', fontWeight: 500 }} className="text-foreground">{uploadedFile?.name || 'No file selected'}</span>
                    </div>
                    <p className="text-muted-foreground">convert into graph</p>
                </div>
                {status === 'processing' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {processingSteps.map(step => (
                            <div key={step.id} className="text-muted-foreground" style={{ display: 'flex', alignItems: 'center' }}>
                                {step.inProgress ? <SpinnerIcon /> : <CheckCircleIcon completed={step.completed} />}
                                <span style={{ marginLeft: '0.75rem' }}>{step.text}</span>
                            </div>
                        ))}
                    </div>
                )}
                {status === 'success' && (
                    <div className="bg-card border rounded-lg shadow-sm" style={{ padding: '1.5rem' }}>
                        <p className="text-muted-foreground" style={{ marginBottom: '1rem' }}>This chart presents a visual timetable showing the weekly schedule.</p>
                        <div className="border rounded-md hover:shadow-lg" style={{ cursor: 'pointer', padding: '1rem', transition: 'box-shadow 0.2s', backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} onClick={() => setIsModalOpen(true)}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Bar dataKey="tasks" radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
                 {status === 'idle' && (
                    <div className="bg-card border rounded-lg shadow-sm text-center" style={{ padding: '4rem', textAlign: 'center' }}>
                        <p className="text-muted-foreground">Please go back to the home page and select a file to generate a chart.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VibeChartPage;