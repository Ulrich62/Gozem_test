export interface TestimonialDto {
  id: string;
  created_at: Date;
  language: LanguageDto;
  exercise: ExerciseDto;
  content: string;
  mentor: string;
}

export interface ExerciseDto {
  title: string;
  icon_url: string;
  slug: string;
}

export interface LanguageDto extends ExerciseDto {}
  

export interface TestimonialsListFiltersDto {
  language?: string;
  exercise?: string;
  order?: "newest_first" | "oldest_first" | "";
  page?: number;
}