import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserProfile } from "../contexts/UserProfileContext";
import { useAuth } from "../contexts/AuthContext";
import { Camera, Save, X } from "lucide-react";

const ProfileForm = () => {
  const { profile, updateProfile } = useUserProfile();
  const { user } = useAuth();

  // debug: usuário
  // console.log("🔍 ProfileForm render - isEditing:", isEditing, "user:", user?.uid);

  // Não renderizar se usuário não estiver logado
  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Faça login para editar seu perfil</p>
        </CardContent>
      </Card>
    );
  }

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: profile.displayName || "",
    bio: profile.bio || "",
    photoURL: profile.photoURL || "",
  });
  const [saving, setSaving] = useState(false);

  // Atualizar formData quando profile mudar
  useEffect(() => {
    setFormData({
      displayName: profile.displayName || "",
      bio: profile.bio || "",
      photoURL: profile.photoURL || "",
    });
  }, [profile]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    console.log("🔄 Iniciando salvamento do perfil:", formData);
    setSaving(true);
    try {
      const success = await updateProfile(formData);
      console.log("📊 Resultado do salvamento:", success);
      if (success) {
        setIsEditing(false);
        console.log("✅ Perfil salvo, saindo do modo edição");
      } else {
        console.error("❌ Falha ao salvar perfil");
      }
    } catch (error) {
      console.error("❌ Erro ao salvar perfil:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: profile.displayName || "",
      bio: profile.bio || "",
      photoURL: profile.photoURL || "",
    });
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Informações Pessoais</CardTitle>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={saving}
              >
                <X className="w-4 h-4 mr-1" />
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-1" />
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Foto do perfil */}
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={formData.photoURL} alt={formData.displayName} />
            <AvatarFallback className="text-lg">
              {getInitials(formData.displayName || "U")}
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <div className="flex-1">
              <Label htmlFor="photoURL">URL da Foto</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="photoURL"
                  value={formData.photoURL}
                  onChange={(e) =>
                    handleInputChange("photoURL", e.target.value)
                  }
                  placeholder="https://exemplo.com/foto.jpg"
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Nome */}
        <div>
          <Label htmlFor="displayName">Nome Completo</Label>
          {isEditing ? (
            <Input
              id="displayName"
              value={formData.displayName}
              onChange={(e) => handleInputChange("displayName", e.target.value)}
              placeholder="Seu nome completo"
              className="mt-1"
            />
          ) : (
            <p className="mt-1 text-gray-900 dark:text-white">
              {profile.displayName || "Não informado"}
            </p>
          )}
        </div>

        {/* Bio */}
        <div>
          <Label htmlFor="bio">Sobre Mim</Label>
          {isEditing ? (
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Conte um pouco sobre você, sua experiência e objetivos profissionais..."
              rows={4}
              className="mt-1"
            />
          ) : (
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {profile.bio || "Nenhuma descrição adicionada"}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
