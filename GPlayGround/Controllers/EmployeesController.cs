using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using GPlayGround.Models.DB;

namespace GPlayGround.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly TsGroundContext _context;

        public EmployeesController(TsGroundContext context)
        {
            _context = context;
        }

        // GET: Employees
        public async Task<IActionResult> Index()
        {
            return View(await _context.Employee.ToListAsync());
        }

        // GET: Employees/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var employee = await _context.Employee
                .FirstOrDefaultAsync(m => m.EmployeeId == id);
            if (employee == null)
            {
                return NotFound();
            }

            return View(employee);
        }


        // POST: Employees/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.

        //[ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Employee employee)
        {
            _context.Add(employee);
            await _context.SaveChangesAsync();
            return View(nameof(Index), await _context.Employee.ToListAsync());
        }

        // POST: Employees/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<IActionResult> Edit([FromBody] Employee employee)
        {
                try
                {
                    _context.Update(employee);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EmployeeExists(employee.EmployeeId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            return View(nameof(Index), await _context.Employee.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await _context.Employee.FindAsync(id);
            _context.Employee.Remove(employee);;
            await _context.SaveChangesAsync();
            return View(nameof(Index), await _context.Employee.ToListAsync());
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.EmployeeId == id);
        }

    }
}
