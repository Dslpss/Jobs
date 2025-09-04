import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useToast } from '../hooks/use-toast';
import { mockJobs } from '../mock';
import { 
  MapPin, Calendar, Users, Briefcase, Clock, CheckCircle, 
  Building, ArrowLeft, Mail, Phone, User, FileText 
} from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  });

  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return <Navigate to="/" replace />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getModalityColor = (modality) => {
    switch (modality) {
      case 'Remoto': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Presencial': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Híbrido': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Junior': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pleno': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Senior': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    setIsApplying(true);

    // Simular envio da candidatura
    setTimeout(() => {
      toast({
        title: "Candidatura enviada!",
        description: "Sua candidatura foi enviada com sucesso. A empresa entrará em contato em breve.",
      });
      setIsApplying(false);
      setApplicationData({ name: '', email: '', phone: '', coverLetter: '' });
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar às vagas
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`${getModalityColor(job.modality)} font-medium`}>
                    {job.modality}
                  </Badge>
                  <Badge className={`${getLevelColor(job.level)} font-medium`}>
                    {job.level}
                  </Badge>
                  <Badge variant="outline" className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                    {job.type}
                  </Badge>
                </div>
                
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </CardTitle>
                
                <div className="flex items-center text-emerald-600 font-medium text-lg mb-4">
                  <Building className="h-5 w-5 mr-2" />
                  {job.company}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Publicado em {formatDate(job.postedDate)}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {job.applications} candidatos
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Descrição da Vaga</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Benefícios</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Card */}
              <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold mb-2">{job.salary}</CardTitle>
                  <p className="text-emerald-100">Salário mensal</p>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-white text-emerald-600 hover:bg-gray-50 font-semibold text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                      >
                        Candidatar-se à Vaga
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Candidatar-se à Vaga</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleApplicationSubmit} className="space-y-4">
                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <User className="h-4 w-4 mr-2" />
                            Nome Completo
                          </label>
                          <Input
                            required
                            value={applicationData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Seu nome completo"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </label>
                          <Input
                            type="email"
                            required
                            value={applicationData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="seu@email.com"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <Phone className="h-4 w-4 mr-2" />
                            Telefone
                          </label>
                          <Input
                            type="tel"
                            required
                            value={applicationData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="(11) 99999-9999"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FileText className="h-4 w-4 mr-2" />
                            Carta de Apresentação
                          </label>
                          <Textarea
                            value={applicationData.coverLetter}
                            onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                            placeholder="Por que você é o candidato ideal para esta vaga?"
                            rows={4}
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                          disabled={isApplying}
                        >
                          {isApplying ? 'Enviando...' : 'Enviar Candidatura'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Tecnologias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 hover:bg-emerald-100 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Job Info */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Informações da Vaga</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Modalidade:</span>
                    <Badge className={`${getModalityColor(job.modality)} font-medium`}>
                      {job.modality}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nível:</span>
                    <Badge className={`${getLevelColor(job.level)} font-medium`}>
                      {job.level}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contrato:</span>
                    <span className="font-medium">{job.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Candidatos:</span>
                    <span className="font-medium">{job.applications}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;