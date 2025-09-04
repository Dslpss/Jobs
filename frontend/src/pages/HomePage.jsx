import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import JobFilters from '../components/JobFilters';
import { mockJobs } from '../mock';
import { Search, Briefcase, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedContract, setSelectedContract] = useState('');

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTech = !selectedTech || job.technologies.includes(selectedTech);
      const matchesLocation = !selectedLocation || job.location === selectedLocation;
      const matchesModality = !selectedModality || job.modality === selectedModality;
      const matchesLevel = !selectedLevel || job.level === selectedLevel;
      const matchesContract = !selectedContract || job.type === selectedContract;

      return matchesSearch && matchesTech && matchesLocation && matchesModality && matchesLevel && matchesContract;
    });
  }, [searchTerm, selectedTech, selectedLocation, selectedModality, selectedLevel, selectedContract]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTech('');
    setSelectedLocation('');
    setSelectedModality('');
    setSelectedLevel('');
    setSelectedContract('');
  };

  const stats = {
    totalJobs: mockJobs.length,
    remoteJobs: mockJobs.filter(job => job.modality === 'Remoto').length,
    seniorJobs: mockJobs.filter(job => job.level === 'Senior').length
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Encontre sua próxima
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                oportunidade em tech
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
              Conectamos desenvolvedores talentosos com as melhores empresas do Brasil
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Briefcase className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold">{stats.totalJobs}+</div>
                <div className="text-emerald-200">Vagas Disponíveis</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Search className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold">{stats.remoteJobs}</div>
                <div className="text-emerald-200">Vagas Remotas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold">{stats.seniorJobs}</div>
                <div className="text-emerald-200">Vagas Senior</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <JobFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedTech={selectedTech}
                setSelectedTech={setSelectedTech}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                selectedModality={selectedModality}
                setSelectedModality={setSelectedModality}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                selectedContract={selectedContract}
                setSelectedContract={setSelectedContract}
                clearFilters={clearFilters}
              />
            </div>

            {/* Jobs List */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {filteredJobs.length} vagas disponíveis
                </h2>
                <p className="text-gray-600">
                  Encontre a oportunidade perfeita para sua carreira
                </p>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhuma vaga encontrada
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tente ajustar seus filtros ou fazer uma nova busca
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;