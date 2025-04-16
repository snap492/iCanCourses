using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.Wpf;
using Microsoft.Win32;
using System.IO;
using System.Net;
using System.Windows;
using System.Windows.Interop;

namespace iCanCourses
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private string? courseData;
        public MainWindow()
        {
            InitializeComponent();
            StartHttpServer();
            InitializeAsync();

        }
        async void InitializeAsync()
        {
            var env = await CoreWebView2Environment.CreateAsync(null, Path.Combine(Directory.GetCurrentDirectory(), "webview2cache"));
            await WebView.EnsureCoreWebView2Async(env);
            WebView.CoreWebView2.OpenDevToolsWindow();// открыть DevTools
            WebView.Source = new Uri("http://localhost:8888/index.html");
            WebView.CoreWebView2.WebMessageReceived += WebView_WebMessageReceived;
        }
        void StartHttpServer()
        {
            var listener = new HttpListener();
            listener.Prefixes.Add("http://localhost:8888/");
            listener.Start();
            Task.Run(() =>
            {
                while (true)
                {
                    var context = listener.GetContext();
                    var localPath = context.Request.Url.LocalPath.TrimStart('/');
                    var filePath = Path.Combine("wwwroot", localPath);

                    if (string.IsNullOrWhiteSpace(localPath) || !File.Exists(filePath))
                    {
                        context.Response.StatusCode = 404;
                        context.Response.Close();
                        continue;
                    }

                    var buffer = File.ReadAllBytes(filePath);
                    context.Response.ContentType = GetMimeType(filePath);
                    context.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    context.Response.Close();
                }
            });
        }

        string GetMimeType(string filePath)
        {
            var ext = Path.GetExtension(filePath);
            return ext switch
            {
                ".html" => "text/html",
                ".js" => "application/javascript",
                ".css" => "text/css",
                ".json" => "application/json",
                ".png" => "image/png",
                ".jpg" => "image/jpeg",
                _ => "application/octet-stream"
            };
        }
        private void WebView_WebMessageReceived(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
        {
            var message = e.TryGetWebMessageAsString();

            switch (message)
            {
                case "Hello from React!":
                    MessageBox.Show("Получено сообщение из React!");
                    break;
               
                default:
                    MessageBox.Show($"Неизвестное сообщение: {message}");
                    break;
            }


        }

        
    }
}