import { FetchApi } from "utils/fetchApi.utils";
import { ServiceBase } from "./serviceBase.service";
import { TestimonialDto, TestimonialsListFiltersDto } from "dtos/testimonials.dto";

export class TestimonialsService extends ServiceBase {
  private fetchApi = FetchApi.getInstance();
  private apiPath = "testimonials";

  static getInstance() {
    return ServiceBase.get(TestimonialsService);
  }

  getTestimonials(options?: TestimonialsListFiltersDto) {
    return this.fetchApi.get<TestimonialDto[]>(this.apiPath, options);
  }
}
