import { useState, useEffect } from 'react';

export default function StudentPayments(){
  const id = localStorage.getItem('student_id') || 'unknown';
  const dept = localStorage.getItem('student_dept') || '';
  const keyAll = `payments_all`; // global payments list
  const [payments, setPayments] = useState([]);

  useEffect(()=>{
    const p = JSON.parse(localStorage.getItem(keyAll) || 'null');
    if (p) setPayments(p);
    else {
      // seed sample payments for different departments
      const sample = [
        { id: 'P1', dept: 'CSE', title: 'Tuition Fee - Semester', amount: 500, due: true },
        { id: 'P2', dept: 'EEE', title: 'Lab Fee', amount: 150, due: true },
        { id: 'P3', dept: 'CSE', title: 'Library Fine', amount: 10, due: true },
      ];
      localStorage.setItem(keyAll, JSON.stringify(sample));
      setPayments(sample);
    }
  },[]);

  function pay(paymentId){
    const p = payments.find(x=>x.id===paymentId);
    if (!p) return;
    if (p.dept !== dept) return alert('You can only pay dues for your department');
    const next = payments.map(x=> x.id===paymentId? {...x, due:false, paidBy:id, paidAt: new Date().toISOString()} : x);
    setPayments(next); localStorage.setItem(keyAll, JSON.stringify(next));
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Payments</h2>
      <p className="mb-4">Department: <strong>{dept || 'N/A'}</strong></p>
      <table className="w-full">
        <thead><tr><th className="border p-2">Title</th><th className="border p-2">Dept</th><th className="border p-2">Amount</th><th className="border p-2">Status</th><th className="border p-2">Action</th></tr></thead>
        <tbody>
          {payments.map(p=> (
            <tr key={p.id}><td className="border p-2">{p.title}</td><td className="border p-2">{p.dept}</td><td className="border p-2">${p.amount}</td><td className="border p-2">{p.due? 'Due':'Paid'}</td><td className="border p-2">{p.due? <button onClick={()=>pay(p.id)} className="bg-green-600 text-white px-2 py-1 rounded">Pay</button> : '—'}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
