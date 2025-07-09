import { useState } from 'react';
import jsPDF from 'jspdf';

export default function Analyzer() {
  const [revenue, setRevenue] = useState('');
  const [profit, setProfit] = useState('');
  const [price, setPrice] = useState('');
  const [salary, setSalary] = useState('');
  const [result, setResult] = useState(null);

  const evaluate = () => {
    const r = parseFloat(revenue);
    const p = parseFloat(profit);
    const pr = parseFloat(price);
    const s = parseFloat(salary);
    const sde = p + s;
    const roi = sde / pr;
    const payback = pr / sde;
    let rec = 'Wait';
    if (roi > 0.4) rec = 'Strong Buy';
    else if (roi > 0.25) rec = 'Buy';
    else if (roi < 0.15) rec = 'Run';
    setResult({ roi, payback, rec, sde });
  };

  const download = () => {
    const doc = new jsPDF();
    doc.text('Business Summary', 20, 20);
    doc.text(`ROI: ${(result.roi * 100).toFixed(1)}%`, 20, 30);
    doc.text(`Payback: ${result.payback.toFixed(1)} years`, 20, 40);
    doc.text(`SDE: $${result.sde.toFixed(0)}`, 20, 50);
    doc.text(`Recommendation: ${result.rec}`, 20, 60);
    doc.save("deal.pdf");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Business Deal Analyzer</h2>
      <input placeholder="Revenue" onChange={e => setRevenue(e.target.value)} /><br />
      <input placeholder="Profit" onChange={e => setProfit(e.target.value)} /><br />
      <input placeholder="Asking Price" onChange={e => setPrice(e.target.value)} /><br />
      <input placeholder="Owner Salary" onChange={e => setSalary(e.target.value)} /><br />
      <button onClick={evaluate}>Analyze</button>
      {result && (
        <div>
          <p>ROI: {(result.roi * 100).toFixed(1)}%</p>
          <p>Payback: {result.payback.toFixed(1)} years</p>
          <p>SDE: ${result.sde.toFixed(0)}</p>
          <p>Recommendation: {result.rec}</p>
          <button onClick={download}>Download PDF</button>
        </div>
      )}
    </div>
  );
}