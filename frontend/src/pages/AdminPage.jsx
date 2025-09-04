import React, { useState } from 'react';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { 
  Plus, Edit, Trash2, Eye, Users, TrendingUp, 
  Briefcase, MapPin, Clock, Building, Calendar 
} from 'lucide-react';
import { mockJobs, mockApplications, technologies, locations, modalities, levels, contractTypes } from '../mock';

const AdminPage = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState(mockJobs);
  const [applications] = useState(mockApplications);
  const [editingJob, setEditingJob] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: '',
    modality: '',
    level: '',
    technologies: [],
    description: '',
    requirements: [''],
    benefits: ['']
  });

  const handleCreateJob = () => {
    if (!newJob.title || !newJob.company || !newJob.location) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const job = {
      id: (jobs.length + 1).toString(),
      ...newJob,
      postedDate: new Date().toISOString().split('T')[0],
      applications: 0,
      requirements: newJob.requirements.filter(req => req.trim()),
      benefits: newJob.benefits.filter(benefit => benefit.trim())
    };

    setJobs([job, ...jobs]);
    setNewJob({
      title: '',
      company: '',
      location: '',
      salary: '',
      type: '',
      modality: '',
      level: '',
      technologies: [],
      description: '',
      requirements: [''],
      benefits: ['']
    });
    setIsCreating(false);

    toast({
      title: "Vaga criada!",
      description: "A nova vaga foi adicionada com sucesso."
    });
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast({
      title: "Vaga removida",
      description: "A vaga foi removida com sucesso."
    });
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
  };

  const handleUpdateJob = () => {
    setJobs(jobs.map(job => job.id === editingJob.id ? editingJob : job));
    setEditingJob(null);
    toast({
      title: "Vaga atualizada!",
      description: "As alterações foram salvas com sucesso."
    });
  };

  const addRequirement = () => {
    setNewJob(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const addBenefit = () => {
    setNewJob(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateRequirement = (index, value) => {
    setNewJob(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const updateBenefit = (index, value) => {
    setNewJob(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  const removeRequirement = (index) => {
    setNewJob(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const removeBenefit = (index) => {
    setNewJob(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const toggleTechnology = (tech) => {
    setNewJob(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const stats = {
    totalJobs: jobs.length,
    totalApplications: applications.length,
    avgApplicationsPerJob: jobs.length > 0 ? Math.round(applications.length / jobs.length) : 0
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getModalityColor = (modality) => {
    switch (modality) {
      case 'Remoto': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Presencial': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Híbrido': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie vagas e candidaturas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Total de Vagas</p>
                  <p className="text-3xl font-bold">{stats.totalJobs}</p>
                </div>
                <Briefcase className="h-12 w-12 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Candidaturas</p>
                  <p className="text-3xl font-bold">{stats.totalApplications}</p>
                </div>
                <Users className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Média por Vaga</p>
                  <p className="text-3xl font-bold">{stats.avgApplicationsPerJob}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Gerenciar Vagas</TabsTrigger>
            <TabsTrigger value="applications">Candidaturas</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            {/* Add Job Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Vagas Cadastradas</h2>
              <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Vaga
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Vaga</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Título da Vaga *</label>
                      <Input
                        value={newJob.title}
                        onChange={(e) => setNewJob(prev => ({...prev, title: e.target.value}))}
                        placeholder="Ex: Desenvolvedor React Senior"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Empresa *</label>
                      <Input
                        value={newJob.company}
                        onChange={(e) => setNewJob(prev => ({...prev, company: e.target.value}))}
                        placeholder="Nome da empresa"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Localização *</label>
                      <Select value={newJob.location} onValueChange={(value) => setNewJob(prev => ({...prev, location: value}))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione a localização" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map(location => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Salário</label>
                      <Input
                        value={newJob.salary}
                        onChange={(e) => setNewJob(prev => ({...prev, salary: e.target.value}))}
                        placeholder="Ex: R$ 8.000 - R$ 12.000"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Modalidade</label>
                      <Select value={newJob.modality} onValueChange={(value) => setNewJob(prev => ({...prev, modality: value}))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione a modalidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {modalities.map(modality => (
                            <SelectItem key={modality} value={modality}>{modality}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Nível</label>
                      <Select value={newJob.level} onValueChange={(value) => setNewJob(prev => ({...prev, level: value}))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="text-sm font-medium">Descrição</label>
                    <Textarea
                      value={newJob.description}
                      onChange={(e) => setNewJob(prev => ({...prev, description: e.target.value}))}
                      placeholder="Descrição detalhada da vaga..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium mb-3 block">Tecnologias</label>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map(tech => (
                        <Badge
                          key={tech}
                          variant={newJob.technologies.includes(tech) ? "default" : "outline"}
                          className={`cursor-pointer transition-colors ${
                            newJob.technologies.includes(tech) 
                              ? 'bg-emerald-500 hover:bg-emerald-600' 
                              : 'hover:bg-emerald-50'
                          }`}
                          onClick={() => toggleTechnology(tech)}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateJob} className="bg-emerald-500 hover:bg-emerald-600">
                      Criar Vaga
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Jobs List */}
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job) => (
                <Card key={job.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex items-center text-emerald-600 font-medium mb-2">
                          <Building className="h-4 w-4 mr-2" />
                          {job.company}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(job.postedDate)}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {job.applications} candidatos
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={`${getModalityColor(job.modality)} font-medium`}>
                            {job.modality}
                          </Badge>
                          <Badge variant="outline" className="bg-emerald-50 border-emerald-200">
                            {job.level}
                          </Badge>
                          {job.salary && (
                            <Badge variant="outline" className="bg-teal-50 border-teal-200">
                              {job.salary}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => window.open(`/job/${job.id}`, '_blank')}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditJob(job)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteJob(job.id)} className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Candidaturas Recebidas</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Nenhuma candidatura recebida ainda.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => {
                      const job = jobs.find(j => j.id === application.jobId);
                      return (
                        <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{application.candidateName}</h4>
                              <p className="text-sm text-gray-600">{application.candidateEmail}</p>
                              <p className="text-sm text-gray-600">{application.candidatePhone}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-emerald-600">{job?.title}</p>
                              <p className="text-sm text-gray-500">{formatDate(application.appliedDate)}</p>
                            </div>
                          </div>
                          {application.coverLetter && (
                            <div className="mt-3 p-3 bg-gray-50 rounded">
                              <p className="text-sm text-gray-700">{application.coverLetter}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;