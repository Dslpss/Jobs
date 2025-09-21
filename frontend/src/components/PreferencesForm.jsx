import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useUserProfile } from "../contexts/UserProfileContext";
import { MapPin, DollarSign, Briefcase, Save } from "lucide-react";

const LOCATIONS = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Brasília",
  "Porto Alegre",
  "Salvador",
  "Recife",
  "Fortaleza",
  "Curitiba",
  "Florianópolis",
  "Remoto",
  "Internacional",
];

const MODALITIES = [
  { id: "remoto", label: "Remoto" },
  { id: "presencial", label: "Presencial" },
  { id: "hibrido", label: "Híbrido" },
];

const JOB_TYPES = [
  { id: "clt", label: "CLT" },
  { id: "pj", label: "PJ" },
  { id: "freelancer", label: "Freelancer" },
  { id: "temporario", label: "Temporário" },
  { id: "estagio", label: "Estágio" },
  { id: "trainee", label: "Trainee" },
];

const PreferencesForm = () => {
  const { profile, updateWorkPreferences } = useUserProfile();
  const [preferences, setPreferences] = useState(
    profile.workPreferences || {
      salaryRange: { min: "", max: "" },
      locations: [],
      modalities: [],
      jobTypes: [],
    }
  );
  const [saving, setSaving] = useState(false);

  const handleSalaryChange = (field, value) => {
    setPreferences((prev) => ({
      ...prev,
      salaryRange: {
        ...prev.salaryRange,
        [field]: value,
      },
    }));
  };

  const handleLocationToggle = (location) => {
    setPreferences((prev) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((l) => l !== location)
        : [...prev.locations, location],
    }));
  };

  const handleModalityToggle = (modalityId) => {
    setPreferences((prev) => ({
      ...prev,
      modalities: prev.modalities.includes(modalityId)
        ? prev.modalities.filter((m) => m !== modalityId)
        : [...prev.modalities, modalityId],
    }));
  };

  const handleJobTypeToggle = (jobTypeId) => {
    setPreferences((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(jobTypeId)
        ? prev.jobTypes.filter((j) => j !== jobTypeId)
        : [...prev.jobTypes, jobTypeId],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateWorkPreferences(preferences);
    } catch (error) {
      console.error("Erro ao salvar preferências:", error);
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const parseCurrency = (value) => {
    return value.replace(/[^\d]/g, "");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Preferências de Trabalho
          </CardTitle>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-1" />
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Faixa Salarial */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4" />
            Faixa Salarial Pretendida
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minSalary" className="text-sm text-gray-600">
                Mínimo
              </Label>
              <Input
                id="minSalary"
                value={formatCurrency(preferences.salaryRange.min)}
                onChange={(e) =>
                  handleSalaryChange("min", parseCurrency(e.target.value))
                }
                placeholder="R$ 3.000"
              />
            </div>
            <div>
              <Label htmlFor="maxSalary" className="text-sm text-gray-600">
                Máximo
              </Label>
              <Input
                id="maxSalary"
                value={formatCurrency(preferences.salaryRange.max)}
                onChange={(e) =>
                  handleSalaryChange("max", parseCurrency(e.target.value))
                }
                placeholder="R$ 15.000"
              />
            </div>
          </div>
        </div>

        {/* Localizações */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4" />
            Localizações de Interesse
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {LOCATIONS.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={preferences.locations.includes(location)}
                  onCheckedChange={() => handleLocationToggle(location)}
                />
                <Label
                  htmlFor={`location-${location}`}
                  className="text-sm cursor-pointer"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Modalidades */}
        <div>
          <Label className="mb-3 block">Modalidade de Trabalho</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {MODALITIES.map((modality) => (
              <div key={modality.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`modality-${modality.id}`}
                  checked={preferences.modalities.includes(modality.id)}
                  onCheckedChange={() => handleModalityToggle(modality.id)}
                />
                <Label
                  htmlFor={`modality-${modality.id}`}
                  className="text-sm cursor-pointer"
                >
                  {modality.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de Contrato */}
        <div>
          <Label className="mb-3 block">Tipos de Contrato</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {JOB_TYPES.map((jobType) => (
              <div key={jobType.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`jobtype-${jobType.id}`}
                  checked={preferences.jobTypes.includes(jobType.id)}
                  onCheckedChange={() => handleJobTypeToggle(jobType.id)}
                />
                <Label
                  htmlFor={`jobtype-${jobType.id}`}
                  className="text-sm cursor-pointer"
                >
                  {jobType.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesForm;
