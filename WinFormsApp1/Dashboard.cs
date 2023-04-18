using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net.Http;
using Newtonsoft.Json;
using ItemInventory.Models;

namespace WinFormsApp1
{
    public partial class Dashboard : Form
    {
        public Dashboard()
        {
            InitializeComponent();
        }

        private async void Dashboard_Load(object sender, EventArgs e)
        {
            // Load items from RESTful API
            List<Item> items = await LoadItemsFromApi();

            // Bind items to DataGridView
            dataGridView1.DataSource = items;
        }

        private async Task<List<Item>> LoadItemsFromApi()
        {
            List<Item> items = new List<Item>();
            try
            {
                // Create HttpClient
                using (HttpClient httpClient = new HttpClient())
                {
                    // Send GET request to API
                    HttpResponseMessage response = await httpClient.GetAsync("https://localhost:7206/api/Item/GetItem");

                    // If request is successful
                    if (response.IsSuccessStatusCode)
                    {
                        // Read response content as string
                        string responseContent = await response.Content.ReadAsStringAsync();

                        // Deserialize response content to List<Item>
                        items = JsonConvert.DeserializeObject<List<Item>>(responseContent);
                    }
                    else
                    {
                        // Handle unsuccessful request
                        MessageBox.Show("Failed to load items from API. Error: " + response.ReasonPhrase, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
                MessageBox.Show("Failed to load items from API. Error: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

            return items;
        }

        private void button1_Click(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}
