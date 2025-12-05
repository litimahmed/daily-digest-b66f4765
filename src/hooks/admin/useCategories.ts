/**
 * useCategories Hook
 * 
 * Custom hook for managing categories data in the admin panel.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/admin/categoryService";
import { useToast } from "@/hooks/use-toast";

export function useCategories() {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => categoryService.getCategories(),
  });

  return {
    categories: data?.data ?? [],
    count: data?.count ?? 0,
    isLoading,
    error,
    refetch,
  };
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (formData: FormData) => categoryService.createCategory(formData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({
        title: "Success",
        description: response.message || "Category created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create category",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ categoryId, formData }: { categoryId: string | number; formData: FormData }) => 
      categoryService.updateCategory(categoryId, formData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({
        title: "Success",
        description: response.message || "Category updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update category",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (categoryId: number) => categoryService.deleteCategory(categoryId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({
        title: "Success",
        description: response.message || "Category deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete category",
        variant: "destructive",
      });
    },
  });
}

export function useSuspendCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (categoryId: number) => categoryService.suspendCategory(categoryId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({
        title: "Success",
        description: response.message || "Category suspended successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to suspend category",
        variant: "destructive",
      });
    },
  });
}

export function useResumeCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (categoryId: number) => categoryService.resumeCategory(categoryId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({
        title: "Success",
        description: response.message || "Category activated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to activate category",
        variant: "destructive",
      });
    },
  });
}
