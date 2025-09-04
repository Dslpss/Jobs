// Mock data para vagas de programação
export const mockJobs = [
  {
    id: '1',
    title: 'Desenvolvedor React Senior',
    company: 'TechCorp Brasil',
    location: 'São Paulo, SP',
    salary: 'R$ 12.000 - R$ 18.000',
    type: 'CLT',
    modality: 'Remoto',
    level: 'Senior',
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
    description: 'Buscamos um desenvolvedor React senior para liderar projetos inovadores em nossa equipe. Você trabalhará com tecnologias modernas e terá autonomia para tomar decisões técnicas importantes.',
    requirements: [
      '5+ anos de experiência com React',
      'Conhecimento avançado em TypeScript',
      'Experiência com testes automatizados',
      'Conhecimento em arquitetura de software'
    ],
    benefits: [
      'Vale refeição R$ 1.200',
      'Plano de saúde e odontológico',
      'Home office',
      'Horário flexível'
    ],
    postedDate: '2025-01-15',
    applications: 23
  },
  {
    id: '2',
    title: 'Full Stack Developer Python/Django',
    company: 'Startup Inovadora',
    location: 'Rio de Janeiro, RJ',
    salary: 'R$ 8.000 - R$ 12.000',
    type: 'CLT',
    modality: 'Híbrido',
    level: 'Pleno',
    technologies: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    description: 'Oportunidade única para trabalhar em uma startup em crescimento acelerado. Você participará do desenvolvimento de produtos inovadores que impactam milhares de usuários.',
    requirements: [
      '3+ anos de experiência com Python',
      'Conhecimento sólido em Django',
      'Experiência com bancos de dados relacionais',
      'Conhecimento em Docker'
    ],
    benefits: [
      'Equity da empresa',
      'Vale refeição R$ 800',
      'Plano de saúde',
      'Ambiente jovem e dinâmico'
    ],
    postedDate: '2025-01-14',
    applications: 15
  },
  {
    id: '3',
    title: 'Desenvolvedor Mobile Flutter',
    company: 'AppTech Solutions',
    location: 'Belo Horizonte, MG',
    salary: 'R$ 9.000 - R$ 14.000',
    type: 'PJ',
    modality: 'Presencial',
    level: 'Pleno',
    technologies: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
    description: 'Procuramos um desenvolvedor Flutter para criar aplicativos móveis incríveis. Você trabalhará com uma equipe experiente em projetos desafiadores para grandes clientes.',
    requirements: [
      '2+ anos de experiência com Flutter',
      'Conhecimento em Dart',
      'Experiência com integração de APIs',
      'Publicação de apps na Play Store/App Store'
    ],
    benefits: [
      'Salário competitivo',
      'Auxílio combustível',
      'Convênio médico',
      'Ambiente colaborativo'
    ],
    postedDate: '2025-01-13',
    applications: 31
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Porto Alegre, RS',
    salary: 'R$ 15.000 - R$ 22.000',
    type: 'CLT',
    modality: 'Remoto',
    level: 'Senior',
    technologies: ['AWS', 'Kubernetes', 'Docker', 'Jenkins', 'Terraform'],
    description: 'Estamos buscando um DevOps Engineer experiente para modernizar nossa infraestrutura e implementar as melhores práticas de CI/CD.',
    requirements: [
      '4+ anos de experiência em DevOps',
      'Expertise em AWS',
      'Conhecimento avançado em Kubernetes',
      'Experiência com infraestrutura como código'
    ],
    benefits: [
      'Salário acima do mercado',
      'Vale refeição R$ 1.500',
      'Plano de saúde premium',
      'Licença para cursos e certificações'
    ],
    postedDate: '2025-01-12',
    applications: 8
  },
  {
    id: '5',
    title: 'Desenvolvedor Java Junior',
    company: 'Enterprise Solutions',
    location: 'Brasília, DF',
    salary: 'R$ 4.500 - R$ 6.500',
    type: 'CLT',
    modality: 'Híbrido',
    level: 'Junior',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Git'],
    description: 'Oportunidade para desenvolvedor junior crescer em uma empresa consolidada. Oferecemos mentoria e ambiente de aprendizado contínuo.',
    requirements: [
      'Formação em Ciência da Computação ou similar',
      'Conhecimento básico em Java',
      'Familiaridade com Spring Framework',
      'Vontade de aprender e crescer'
    ],
    benefits: [
      'Vale refeição R$ 600',
      'Plano de saúde',
      'Programa de mentoria',
      'Plano de carreira estruturado'
    ],
    postedDate: '2025-01-11',
    applications: 67
  }
];

export const mockApplications = [
  {
    id: '1',
    jobId: '1',
    candidateName: 'João Silva',
    candidateEmail: 'joao@email.com',
    candidatePhone: '(11) 99999-9999',
    appliedDate: '2025-01-15',
    status: 'pending',
    coverLetter: 'Tenho grande interesse nesta vaga...'
  }
];

export const technologies = [
  'React', 'Angular', 'Vue.js', 'JavaScript', 'TypeScript',
  'Python', 'Django', 'Flask', 'Java', 'Spring Boot',
  'Node.js', 'Express', 'PHP', 'Laravel', 'C#', '.NET',
  'Flutter', 'React Native', 'Swift', 'Kotlin',
  'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB'
];

export const locations = [
  'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG',
  'Porto Alegre, RS', 'Brasília, DF', 'Salvador, BA',
  'Recife, PE', 'Curitiba, PR', 'Fortaleza, CE', 'Remoto'
];

export const modalities = ['Remoto', 'Presencial', 'Híbrido'];
export const levels = ['Junior', 'Pleno', 'Senior'];
export const contractTypes = ['CLT', 'PJ', 'Freelancer'];