import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ChildCategoryService } from 'src/app/inventory-management/services/child-category.service';
import { DepartmentService } from 'src/app/inventory-management/services/department.service';
export interface ChildCategory {
  name: string;
}
@Component({
  selector: 'vex-child-category-select',
  templateUrl: './child-category-select.component.html',
  styleUrls: ['./child-category-select.component.scss']
})
export class ChildCategorySelectComponent implements OnInit {

  departments:any;
  childCategories:any;

  toppings = new FormControl();
  states = [
    {name: 'Alabama', capital: 'Montgomery'},
    {name: 'Alaska', capital: 'Juneau'},
    {name: 'Arizona', capital: 'Phoenix'},
    {name: 'Arkansas', capital: 'Little Rock'},
    {name: 'California', capital: 'Sacramento'},
    {name: 'Colorado', capital: 'Denver'},
    {name: 'Connecticut', capital: 'Hartford'},
    {name: 'Delaware', capital: 'Dover'},
    {name: 'Florida', capital: 'Tallahassee'},
    {name: 'Georgia', capital: 'Atlanta'},
    {name: 'Hawaii', capital: 'Honolulu'},
    {name: 'Idaho', capital: 'Boise'},
    {name: 'Illinois', capital: 'Springfield'},
    {name: 'Indiana', capital: 'Indianapolis'},
    {name: 'Iowa', capital: 'Des Moines'},
    {name: 'Kansas', capital: 'Topeka'},
    {name: 'Kentucky', capital: 'Frankfort'},
    {name: 'Louisiana', capital: 'Baton Rouge'},
    {name: 'Maine', capital: 'Augusta'},
    {name: 'Maryland', capital: 'Annapolis'},
    {name: 'Massachusetts', capital: 'Boston'},
    {name: 'Michigan', capital: 'Lansing'},
    {name: 'Minnesota', capital: 'St. Paul'},
    {name: 'Mississippi', capital: 'Jackson'},
    {name: 'Missouri', capital: 'Jefferson City'},
    {name: 'Montana', capital: 'Helena'},
    {name: 'Nebraska', capital: 'Lincoln'},
    {name: 'Nevada', capital: 'Carson City'},
    {name: 'New Hampshire', capital: 'Concord'},
    {name: 'New Jersey', capital: 'Trenton'},
    {name: 'New Mexico', capital: 'Santa Fe'},
    {name: 'New York', capital: 'Albany'},
    {name: 'North Carolina', capital: 'Raleigh'},
    {name: 'North Dakota', capital: 'Bismarck'},
    {name: 'Ohio', capital: 'Columbus'},
    {name: 'Oklahoma', capital: 'Oklahoma City'},
    {name: 'Oregon', capital: 'Salem'},
    {name: 'Pennsylvania', capital: 'Harrisburg'},
    {name: 'Rhode Island', capital: 'Providence'},
    {name: 'South Carolina', capital: 'Columbia'},
    {name: 'South Dakota', capital: 'Pierre'},
    {name: 'Tennessee', capital: 'Nashville'},
    {name: 'Texas', capital: 'Austin'},
    {name: 'Utah', capital: 'Salt Lake City'},
    {name: 'Vermont', capital: 'Montpelier'},
    {name: 'Virginia', capital: 'Richmond'},
    {name: 'Washington', capital: 'Olympia'},
    {name: 'West Virginia', capital: 'Charleston'},
    {name: 'Wisconsin', capital: 'Madison'},
    {name: 'Wyoming', capital: 'Cheyenne'},
  ];
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  myControl = new FormControl();
  options: ChildCategory[] = [{name: 'لعب البنات'}, {name: 'الهواتف المحمولة'}, {name: 'تنظيف المنزل'}];
  filteredOptions: Observable<ChildCategory[]>;
  
  constructor(private departmentService: DepartmentService,
    private childCategoryService: ChildCategoryService) { }

  ngOnInit() {
    this.getDepartments();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  onSearchChange(searchValue: string): void {  
    this.childCategoryService.getChildCategoriesByName(searchValue).subscribe(
      res => {
        this.childCategories = res;
      }
    )
  }

  getDepartments() {
    this.departmentService.getDepartmentsWithChildCategories().subscribe(
      res => {
        this.departments = res;
      }
    )
  }

  displayFn(user: ChildCategory): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): ChildCategory[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  


}
