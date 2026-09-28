import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    { title: 'Leaf Disease Detection', desc: 'DenseNet121 deep convolutional neural network for 10 tomato leaf conditions.', icon: '🌿', badge: 'DenseNet121' },
    { title: 'Fruit Disease Detection', desc: 'YOLOv8 architecture prepared for future fruit disease & damage detection.', icon: '🍅', badge: 'YOLOv8-Ready' },
    { title: 'Stem Disease Detection', desc: 'YOLOv8 architecture prepared for future stem & vascular wilt analysis.', icon: '🪴', badge: 'YOLOv8-Ready' },
    { title: 'Decision Fusion Engine', desc: 'Combines multi-part model outputs into a unified diagnosis and overall confidence score.', icon: '⚡', badge: 'Fusion Layer' },
    { title: 'Confidence Scoring', desc: 'Precise model confidence percentage representation for all analyzed plant parts.', icon: '📊', badge: 'Confidence' },
    { title: 'Treatment Guidance', desc: 'Comprehensive chemical, organic, preventive, and best-practice agricultural advice.', icon: '💊', badge: 'Treatments' },
    { title: 'PDF Report Generator', desc: 'Generates downloadable, comprehensive PDF reports for documentation and academic evaluation.', icon: '📄', badge: 'PDF Engine' },
  ];

  const workflow = [
    { step: '01', title: 'Upload Images', desc: 'Upload tomato leaf, fruit, or stem images.' },
    { step: '02', title: 'Preprocessing', desc: 'RGB normalization (224x224) and image scaling.' },
    { step: '03', title: 'Disease Detection', desc: 'DenseNet121 classifier identifies specific disease.' },
    { step: '04', title: 'Decision Fusion', desc: 'Combines multi-modal predictions and scores.' },
    { step: '05', title: 'Treatment Recommendation', desc: 'Generates chemical, organic, and preventive advice.' },
    { step: '06', title: 'Generate PDF Report', desc: 'Download complete report for academic/field records.' },
  ];

  const techs = [
    { name: 'React.js', role: 'Frontend UI Framework' },
    { name: 'Flask', role: 'Python REST API Backend' },
    { name: 'DenseNet121', role: 'Leaf Classifier Neural Net' },
    { name: 'YOLOv8 Architecture', role: 'Fruit & Stem Engine' },
    { name: 'MongoDB', role: 'Database & Metadata Layer' },
    { name: 'ReportLab', role: 'PDF Report Engine' },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-3xl shadow-lg">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
           

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Multi-Part Tomato Disease Detection
            </h1>

            <p className="text-lg text-emerald-100 font-medium">
              AI-powered tomato disease detection with treatment recommendations
            </p>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Detect diseases across tomato leaves, fruits, and stems using deep learning models and receive actionable chemical, organic, and preventive treatment guidance.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/detection')}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/40 transition-all duration-150 space-x-2"
              >
                <span>Start Detection</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-semibold text-emerald-100 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-150"
              >
                <span>Explore Methodology</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl relative">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-800 relative flex items-center justify-center border border-white/10">
                <div className="text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <Leaf className="w-10 h-10" />
                  </div>
                  <div className="text-lg font-bold text-white">Tomato Leaf Classifier</div>
           
                  <div className="inline-block bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-full mt-2">
                    Model Online
                  </div>
                </div>
              </div>
            
            </div>
          </div>

        </div>
      </section>

      {/* PROJECT OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <SectionTitle
            title="Project Overview"
            subtitle="Understanding tomato disease identification and actionable AI guidance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p><strong className="text-slate-800">Agricultural Importance:</strong> Tomato crops are vulnerable to diverse fungal, bacterial, viral pathogens, and pest infestations that severely diminish crop yield.</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p><strong className="text-slate-800">Early Detection:</strong> Timely identification enables targeted intervention before foliage loss, fruit damage, or disease spreading occurs.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p><strong className="text-slate-800">Multi-Part Plant Analysis:</strong> System supports multi-part input (Leaf, Fruit, Stem) for comprehensive diagnostic coverage.</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p><strong className="text-slate-800">Decision Fusion & Reports:</strong> Combines predictions and outputs actionable chemical, organic, and preventive treatment plans with downloadable PDF reports.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Key System Features"
          subtitle="Designed to meet high-end agricultural AI standards and academic evaluation criteria."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">System Architecture & Workflow</h2>
            <p className="text-emerald-300 text-sm mt-2">End-to-end data pipeline from plant image upload to PDF report output</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-center">
            {workflow.map((w, idx) => (
              <div key={idx} className="relative bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 mb-2">{w.step}</span>
                <h4 className="font-bold text-white text-sm mb-1">{w.title}</h4>
                <p className="text-[11px] text-slate-400">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Technology Stack"
          subtitle="Built using industry-standard machine learning and web frameworks."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {techs.map((t, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mx-auto mb-2 text-sm">
                {t.name[0]}
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
              <p className="text-[10px] text-slate-500 mt-1">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};