import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { SectionTitle } from '../components/SectionTitle';
import { Mail, CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="About the Project"
        subtitle="Multi-Part Tomato Disease Detection with Treatment Recommendation Using Deep Learning."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* INTRODUCTION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
          <SectionTitle title="Project Introduction" />
          <p className="text-sm text-slate-600 leading-relaxed">
            This application is a specialized agricultural AI system developed for final-year engineering project demonstration and IEEE presentation. It leverages deep convolutional neural networks to identify tomato plant diseases across multiple plant parts and provides actionable treatment plans.
          </p>
        </div>

        {/* PROBLEM & OBJECTIVES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-3 text-emerald-900">Problem Statement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tomato crops are extremely susceptible to fungal, bacterial, and viral pathogens. Manual disease identification by farmers is often inaccurate and slow, leading to inappropriate pesticide usage, financial loss, and severe crop yield degradation.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-3 text-emerald-900">Project Objectives</h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Develop accurate DenseNet121 classification for 10 tomato leaf diseases.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Prepare extensible YOLOv8 architecture for future fruit and stem detection.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Implement decision fusion for combined modality confidence scores.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Generate downloadable PDF reports for academic and field records.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* METHODOLOGY */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-md">
          <h3 className="text-xl font-bold mb-6 text-center">System Methodology Flow</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center text-xs">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">Image Acquisition</div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">Preprocessing (224x224 RGB)</div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">DenseNet121 & YOLOv8</div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">Decision Fusion Engine</div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">Treatment & PDF Report</div>
          </div>
        </div>

        {/* TEAM CARD */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-8 shadow-lg flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Project Ownership</span>
            <h3 className="text-2xl font-bold">Team Name: Agri AI</h3>
            <p className="text-xs text-slate-300">Department of Computer Science / Information Technology Engineering</p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center space-x-3 bg-white/10 px-5 py-3 rounded-xl border border-white/20">
            <Mail className="w-5 h-5 text-emerald-400" />
            <a href="mailto:kdeeksha918@gmail.com" className="text-sm font-semibold hover:underline">
              kdeeksha918@gmail.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};