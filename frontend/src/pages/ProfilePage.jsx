import React from "react";
import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import SkillsSelector from "../components/SkillsSelector";
import PreferencesForm from "../components/PreferencesForm";
import { useUserProfile } from "../contexts/UserProfileContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { User, History, TrendingUp } from "lucide-react";

const ProfilePage = () => {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header da página */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Meu Perfil
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Gerencie suas informações pessoais, habilidades e preferências de
              trabalho
            </p>
          </div>

          <div className="space-y-6">
            {/* Informações Pessoais */}
            <ProfileForm />

            {/* Habilidades e Tecnologias */}
            <SkillsSelector />

            {/* Preferências de Trabalho */}
            <PreferencesForm />

            {/* Histórico de Vagas Visualizadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Histórico de Vagas Visualizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile.viewedJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Você ainda não visualizou nenhuma vaga
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      As vagas que você visualizar aparecerão aqui
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.viewedJobs.slice(0, 10).map((viewedJob) => (
                      <div
                        key={viewedJob.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {viewedJob.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Visualizada em{" "}
                            {new Date(
                              viewedJob.viewedAt.seconds * 1000
                            ).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <Badge variant="outline">#{viewedJob.id}</Badge>
                      </div>
                    ))}

                    {profile.viewedJobs.length > 10 && (
                      <p className="text-center text-sm text-gray-500">
                        E mais {profile.viewedJobs.length - 10} vagas
                        visualizadas...
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
