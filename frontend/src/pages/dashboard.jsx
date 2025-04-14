import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { ClipboardList, CheckCircle, XCircle, Clock } from 'lucide-react';
import axios from 'axios';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {

    const [tickets,setTickets]=useState([]);
    const [length,setLength]=useState();
    const [Pendinglength,setPendingLength]=useState(0);
    const [Rejectedlength,setRejectedLength]=useState(0);
    const [Solvedlength,setSolvedLength]=useState(0);
    useEffect(()=>{
        const allComplaints=async()=>{
            const response=await axios.get('http://localhost:3000/admin/allTickets');
            setLength(response.data.length);
            setTickets(response.data)
        }
        allComplaints();
    },[])

    useEffect(() => {
        let pending = 0;
        let rejected = 0;
        let solved = 0;
    
        tickets.forEach(ticket => {
          if (ticket.status === 'Pending') {
            pending++;
          } else if (ticket.status === 'Rejected') {
            rejected++;
          } else {
            solved++;
          }
        });
    
        setPendingLength(pending);
        setRejectedLength(rejected);
        setSolvedLength(solved);
      }, [tickets]);


  const complaintData = {
    labels: ['Pending', 'Solved', 'Rejected'],
    datasets: [
      {
        data: [Pendinglength,Solvedlength,Rejectedlength],
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)', // Pending - Yellow
          'rgba(75, 192, 192, 0.7)',  // Solved - Green
          'rgba(255, 99, 132, 0.7)',  // Rejected - Red
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        padding: 12,
        backgroundColor: 'rgba(26, 95, 122, 0.8)',
      }
    },
  };

  const stats = [
    {
      title: 'Total Complaints',
      value: `${length}`,
      icon: ClipboardList,
      color: 'bg-[#1A5F7A]',
      trend: '+12% this month'
    },
    {
      title: 'Pending',
      value: `${Pendinglength}`,
      icon: Clock,
      color: 'bg-yellow-500',
      trend: '5 new today'
    },
    {
      title: 'Solved',
      value: `${Solvedlength}`,
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: '3 solved today'
    },
    {
      title: 'Rejected',
      value: `${Rejectedlength}`,
      icon: XCircle,
      color: 'bg-red-500',
      trend: '1 rejected today'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#1A5F7A] mb-4 md:mb-0">Complaints Overview</h1>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-500">Last updated:</span>
          <span className="font-medium">{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <span className="text-xs font-medium text-gray-500">{stat.trend}</span>
            </div>
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#1A5F7A] mb-6">Complaints Distribution</h2>
          <div className="aspect-square max-w-md mx-auto">
            <PolarArea data={complaintData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;