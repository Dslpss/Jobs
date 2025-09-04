import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Calendar, Users, Briefcase, Clock } from 'lucide-react';

const JobCard = ({ job }) => {
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

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {job.title}
          </CardTitle>
          <Badge className={`${getModalityColor(job.modality)} font-medium`}>
            {job.modality}
          </Badge>
        </div>
        <p className="text-emerald-600 font-medium">{job.company}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" />
            {job.type}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={`${getLevelColor(job.level)} font-medium`}>
            {job.level}
          </Badge>
          <span className="text-emerald-600 font-semibold">{job.salary}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {job.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              {tech}
            </Badge>
          ))}
          {job.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs bg-gray-50">
              +{job.technologies.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(job.postedDate)}
            <Users className="h-3 w-3 ml-3 mr-1" />
            {job.applications} candidatos
          </div>
          <Link to={`/job/${job.id}`}>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              Ver detalhes
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;