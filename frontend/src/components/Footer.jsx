import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Agri AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Multi-Part Tomato Disease Detection with Treatment Recommendation Using Deep Learning.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/detection" className="hover:text-emerald-400 transition-colors">Detection Page</Link></li>
              <li><Link to="/results" className="hover:text-emerald-400 transition-colors">Analysis Results</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Project</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Research Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">System Details</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Leaf Classifier: DenseNet121</li>
              <li>Fruit/Stem Detection: YOLOv8 Architecture Ready</li>
              <li>Decision Fusion Engine</li>
              <li>PDF Report Engine</li>
            </ul>
          </div>

          {/* Col 4: Project Team */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Project Contact</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="font-semibold text-white">Team Name: Agri AI</p>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href="mailto:kdeeksha918@gmail.com" className="hover:text-emerald-400 transition-colors">
                  kdeeksha918@gmail.com
                </a>
              </div>
              <p className="text-xs text-slate-500 pt-2">
                Final Year Engineering Project Demonstration & IEEE Presentation.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Agri AI Project. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Academic Research Project & IEEE Demonstration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
