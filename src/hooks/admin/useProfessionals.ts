import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfessionals,
  getProfessionalById,
  createProfessional,
  updateProfessional,
  activateProfessional,
  deactivateProfessional,
  deleteProfessional,
} from "@/services/admin/professionalService";
import {
  ProfessionalCreatePayload,
  ProfessionalUpdatePayload,
} from "@/types/admin/professional";
import { useToast } from "@/hooks/use-toast";

export const useProfessionals = () => {
  return useQuery({
    queryKey: ["professionals"],
    queryFn: getProfessionals,
  });
};

export const useProfessional = (id: string) => {
  return useQuery({
    queryKey: ["professional", id],
    queryFn: () => getProfessionalById(id),
    enabled: !!id,
  });
};

export const useCreateProfessional = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: ProfessionalCreatePayload) =>
      createProfessional(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      toast({
        title: "Succès",
        description: "Professionnel créé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Échec de la création du professionnel",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProfessional = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProfessionalUpdatePayload }) =>
      updateProfessional(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      toast({
        title: "Succès",
        description: "Professionnel modifié avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Échec de la modification du professionnel",
        variant: "destructive",
      });
    },
  });
};

export const useActivateProfessional = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => activateProfessional(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      toast({
        title: "Succès",
        description: "Professionnel activé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Échec de l'activation du professionnel",
        variant: "destructive",
      });
    },
  });
};

export const useDeactivateProfessional = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deactivateProfessional(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      toast({
        title: "Succès",
        description: "Professionnel désactivé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Échec de la désactivation du professionnel",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProfessional = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteProfessional(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      toast({
        title: "Succès",
        description: "Professionnel supprimé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Échec de la suppression du professionnel",
        variant: "destructive",
      });
    },
  });
};
