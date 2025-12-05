import api from "../api";
import {
  Professional,
  ProfessionalListResponse,
  ProfessionalDetailResponse,
  ProfessionalCreatePayload,
  ProfessionalUpdatePayload,
  ProfessionalMutationResponse,
} from "@/types/admin/professional";

export const getProfessionals = async (): Promise<Professional[]> => {
  const response = await api.get<ProfessionalListResponse[]>(
    "/api/admins/professionnels/afficher/"
  );
  if (response.data[0]?.status && response.data[0]?.data) {
    return response.data[0].data;
  }
  return [];
};

export const getProfessionalById = async (id: string): Promise<Professional> => {
  const response = await api.get<ProfessionalDetailResponse>(
    `/api/admins/professionnels/afficher/${id}/`
  );
  return response.data.data;
};

export const createProfessional = async (
  payload: ProfessionalCreatePayload
): Promise<ProfessionalMutationResponse> => {
  const response = await api.post<ProfessionalMutationResponse>(
    "/api/admins/professionnels/ajouter",
    payload
  );
  return response.data;
};

export const updateProfessional = async (
  id: string,
  payload: ProfessionalUpdatePayload
): Promise<ProfessionalMutationResponse> => {
  const response = await api.put<ProfessionalMutationResponse>(
    `/api/admins/professionnels/modifier/${id}/`,
    payload
  );
  return response.data;
};

export const activateProfessional = async (id: string): Promise<void> => {
  await api.put(`/api/admins/professionnels/activer/${id}`);
};

export const deactivateProfessional = async (id: string): Promise<void> => {
  await api.put(`/api/admins/professionnels/desactiver/${id}/`);
};

export const deleteProfessional = async (id: string): Promise<void> => {
  await api.delete(`/api/admins/professionnels/supprimer/${id}/`);
};
