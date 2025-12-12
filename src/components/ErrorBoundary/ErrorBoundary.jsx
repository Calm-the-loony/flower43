// src/components/ErrorBoundary/ErrorBoundary.jsx
import React, { Component } from 'react';
import NetworkError from '../../pages/ErrorPages/NetworkError';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
      isOnline: navigator.onLine
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Можно отправить ошибку в сервис логирования
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Отправка ошибки на сервер (опционально)
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  handleOnline = () => {
    this.setState({ isOnline: true });
  }

  handleOffline = () => {
    this.setState({ isOnline: false });
  }

  logErrorToService = (error, errorInfo) => {
    // Реализация отправки ошибки на сервер
    // Например, в Sentry, LogRocket или ваш собственный сервис
    try {
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.toString(),
          stack: errorInfo.componentStack,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
    window.location.reload();
  }

  render() {
    if (!this.state.isOnline) {
      return <NetworkError />;
    }

    if (this.state.hasError) {
      // Кастомная страница для ошибок в приложении
      return (
        <div className="error-boundary-page">
          <div className="error-boundary-container">
            <div className="error-boundary-content">
              <div className="error-illustration">
                <div className="error-icon">💐</div>
              </div>
              <h1 className="error-title">Что-то пошло не так</h1>
              <p className="error-description">
                В приложении произошла непредвиденная ошибка. Мы уже работаем над ее решением.
              </p>
              
              <div className="error-details">
                <details>
                  <summary>Техническая информация (для разработчиков)</summary>
                  <div className="details-content">
                    <pre>{this.state.error && this.state.error.toString()}</pre>
                    <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                  </div>
                </details>
              </div>

              <div className="error-actions">
                <button 
                  className="error-btn primary"
                  onClick={this.handleReset}
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Перезагрузить страницу
                </button>
                
                <button 
                  className="error-btn secondary"
                  onClick={() => window.location.href = '/'}
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  На главную
                </button>
              </div>

              <div className="error-help">
                <p>
                  Если ошибка повторяется, пожалуйста,{' '}
                  <a href="mailto:support@flowershop.com?subject=Ошибка в приложении">
                    свяжитесь с поддержкой
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;