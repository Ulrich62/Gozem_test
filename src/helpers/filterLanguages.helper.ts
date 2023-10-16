import { TestimonialDto } from "dtos/testimonials.dto";

type LanguageWithCount = {
  title: string;
  icon_url: string;
  count: number;
  slug: string;
};

export function filterAndCountLanguages(
  testimonials: TestimonialDto[]
): LanguageWithCount[] {
  const languageMap: { [key: string]: LanguageWithCount } = {};

  testimonials?.forEach((testimonial) => {
    const language = testimonial.language;
    if (language && language.slug) {
      if (!languageMap[language.slug]) {
        languageMap[language.slug] = {
          ...language,
          count: 0,
        };
      }
      languageMap[language.slug].count += 1;
    }
  });

  const languagesWithCount = Object.values(languageMap)
    .filter((languageWithCount) => languageWithCount.count > 0)
    .map((languageWithCount) => ({
      ...languageWithCount,
    }));

  return languagesWithCount;
}
